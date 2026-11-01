import { Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    Facebook,
    Globe,
    Instagram,
    Mail,
    MapPin,
    Menu,
    Phone,
    Shield,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface ClubSettings {
    name?: string;
    tagline?: string;
    phone?: string;
    email?: string;
    address?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
}

export interface NavigationItem {
    id?: number;
    title: string;
    url?: string;
    route_name?: string;
}

interface PublicHeaderProps {
    clubSettings?: ClubSettings;
    navigation?: {
        header?: NavigationItem[];
    };
}

function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98v8.32c-.01 2.25-.8 4.49-2.31 6.13-1.65 1.79-4.04 2.78-6.49 2.55-2.61-.2-4.98-1.74-6.24-4.03-1.39-2.5-1.12-5.74.68-7.96 1.73-2.14 4.54-3.14 7.23-2.52.01 1.45.01 2.89 0 4.34-1.4-.38-2.97-.24-4.22.46-1.07.6-1.8 1.68-1.94 2.89-.25 1.55.43 3.19 1.75 4.09 1.25.86 2.92.93 4.25.21 1.14-.62 1.83-1.84 1.84-3.13V.02Z" />
        </svg>
    );
}

const defaultNavLinks = [
    { label: 'Főoldal', href: '/' },
    { label: 'Hírek', href: '/hirek' },
    { label: 'Csapat', href: '/csapat' },
    { label: 'Mérkőzések', href: '/merkozesek' },
    { label: 'Tabella', href: '/tabella' },
    { label: 'Média', href: '/media' },
    { label: 'Támogatók', href: '/tamogatok' },
    { label: 'Stadion', href: '/stadion' },
    { label: 'Kapcsolat', href: '/kapcsolat' },
];

export function PublicHeader({ clubSettings: initialClubSettings, navigation }: PublicHeaderProps) {
    const page = usePage();
    const currentPath = page.url || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const [mobileOpen, setMobileOpen] = useState(false);

    const clubSettings: Required<ClubSettings> = {
        name: initialClubSettings?.name || 'Paksi FC',
        tagline: initialClubSettings?.tagline || 'A magyar csapat',
        phone: initialClubSettings?.phone || '+36 75 830 800',
        email: initialClubSettings?.email || 'info@paksifc.hu',
        address: initialClubSettings?.address || '7030 Paks, Fehérvári út 29.',
        facebook: initialClubSettings?.facebook || 'https://facebook.com/paksifc',
        instagram: initialClubSettings?.instagram || 'https://instagram.com/paksifc_official',
        youtube: initialClubSettings?.youtube || 'https://youtube.com/@paksifc',
        tiktok: initialClubSettings?.tiktok || 'https://tiktok.com/@paksifc',
    };

    const navItems = navigation?.header && navigation.header.length > 0
        ? navigation.header.map((item) => ({
            label: item.title,
            href: item.url || (item.route_name ? `/${item.route_name.replace(/^\//, '')}` : '/'),
        }))
        : defaultNavLinks;

    const isLinkActive = (href: string) => {
        if (href === '/') {
            return currentPath === '/' || currentPath === '';
        }
        return currentPath.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 shadow-xs backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between gap-4 py-2 lg:py-0">
                    {/* LEFT SIDE: Company logo, vertically centered */}
                    <div className="flex shrink-0 items-center">
                        <Link
                            href="/"
                            className="group flex items-center gap-3.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`${clubSettings.name} főoldal`}
                        >
                            <img
                                src="/paks_original.png"
                                alt={clubSettings.name}
                                width={86}
                                height={86}
                                className="h-22 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                            />
                            {/* <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-black tracking-tight text-foreground transition-colors group-hover:text-primary">
                                        {clubSettings.name}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="h-5 px-1.5 text-[10px] font-extrabold uppercase tracking-wider text-primary"
                                    >
                                        1952
                                    </Badge>
                                </div>
                                <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                    {clubSettings.tagline}
                                </span>
                            </div> */}
                        </Link>
                    </div>

                    {/* RIGHT SIDE: Two-level layout (desktop) */}
                    <div className="hidden flex-1 flex-col items-end justify-center lg:flex">

                        {/* Top row: Utility bar with small icons and text */}
                        <div className="flex w-full items-center justify-between gap-3.5 border-b border-border/60 py-2 text-xs text-muted-foreground">
                            <div className="font-extrabold text-green-700 ml-3 text-xl">A MAGYAR CSAPAT</div>









                            {/* Separator */}
                            <Separator orientation="vertical" className="hidden h-3 xl:block" />

                            {/* Address */}
                            {clubSettings.address && (
                                <span
                                    className="hidden items-center gap-1.5 transition-colors hover:text-foreground xl:inline-flex"
                                    title="Cím"
                                >
                                    <MapPin className="size-3.5 text-primary" />
                                    <span className="font-medium">{clubSettings.address}</span>
                                </span>
                            )}

                            {/* Separator */}
                            <Separator orientation="vertical" className="h-3" />

                            {/* Social Media Links with Tooltips */}
                            <TooltipProvider delayDuration={200}>
                                <div className="flex items-center gap-1">
                                    {clubSettings.facebook && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7 text-muted-foreground hover:text-foreground"
                                                    asChild
                                                >
                                                    <a
                                                        href={clubSettings.facebook}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label="Facebook"
                                                    >
                                                        <Facebook className="size-5.5" />
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">Facebook</TooltipContent>
                                        </Tooltip>
                                    )}

                                    {clubSettings.instagram && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7 text-muted-foreground hover:text-foreground"
                                                    asChild
                                                >
                                                    <a
                                                        href={clubSettings.instagram}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label="Instagram"
                                                    >
                                                        <Instagram className="size-5.5" />
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">Instagram</TooltipContent>
                                        </Tooltip>
                                    )}

                                    {clubSettings.youtube && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7 text-muted-foreground hover:text-foreground"
                                                    asChild
                                                >
                                                    <a
                                                        href={clubSettings.youtube}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label="YouTube"
                                                    >
                                                        <Youtube className="size-5.5" />
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">YouTube</TooltipContent>
                                        </Tooltip>
                                    )}

                                    {clubSettings.tiktok && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7 text-muted-foreground hover:text-foreground"
                                                    asChild
                                                >
                                                    <a
                                                        href={clubSettings.tiktok}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        aria-label="TikTok"
                                                    >
                                                        <TikTokIcon className="size-5.5" />
                                                    </a>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">TikTok</TooltipContent>
                                        </Tooltip>
                                    )}
                                </div>
                            </TooltipProvider>


                        </div>

                        {/* Bottom row: Main navigation menu */}
                        <div className="flex w-full items-center justify-between py-2">
                            <NavigationMenu className="max-w-none flex-1 justify-start">
                                <NavigationMenuList className="flex-wrap gap-1">
                                    {navItems.map((item) => {
                                        const active = isLinkActive(item.href);
                                        return (
                                            <NavigationMenuItem key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        navigationMenuTriggerStyle(),
                                                        'h-8 px-3 text-xs font-semibold tracking-wide transition-colors',
                                                        active
                                                            ? 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 hover:text-primary-foreground'
                                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                    )}
                                                >
                                                    {item.label}
                                                </Link>
                                            </NavigationMenuItem>
                                        );
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>

                            {/* Action CTA button */}
                            <div className="ml-4 flex shrink-0 items-center gap-2">
                                <Button
                                    size="sm"
                                    asChild
                                    className="h-8 gap-1.5 px-3.5 text-xs font-bold shadow-xs bg-[#006B3F] hover:bg-[#005432] text-white"
                                >
                                    <Link href="/merkozesek">
                                        <Calendar className="size-3.5 text-amber-300" />
                                        <span>Meccsek</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE / TABLET CONTROLS */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Button
                            size="sm"
                            asChild
                            className="h-8 gap-1 px-2.5 text-xs font-bold bg-[#006B3F] hover:bg-[#005432] text-white"
                        >
                            <Link href="/merkozesek">
                                <Calendar className="size-3.5 text-amber-300" />
                                <span className="hidden sm:inline">Meccsek</span>
                            </Link>
                        </Button>

                        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-9"
                                    aria-label="Navigációs menü megnyitása"
                                >
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="flex w-[320px] flex-col justify-between p-6 sm:w-[380px]">
                                <div className="space-y-6">
                                    <SheetHeader className="text-left">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src="https://paksifc.hu/Paks_original.png"
                                                alt={clubSettings.name}
                                                width={44}
                                                height={44}
                                                className="h-11 w-auto object-contain"
                                            />
                                            <div>
                                                <SheetTitle className="text-lg font-black tracking-tight text-foreground">
                                                    {clubSettings.name}
                                                </SheetTitle>
                                                <p className="text-xs font-medium text-muted-foreground uppercase">
                                                    {clubSettings.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </SheetHeader>

                                    <Separator />

                                    {/* Navigation links */}
                                    <nav className="flex flex-col space-y-1">
                                        {navItems.map((item) => {
                                            const active = isLinkActive(item.href);
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className={cn(
                                                        'flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                                                        active
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                    )}
                                                >
                                                    <span>{item.label}</span>
                                                    {active && (
                                                        <Badge variant="outline" className="h-5 border-primary-foreground/30 text-[10px] text-primary-foreground">
                                                            Aktív
                                                        </Badge>
                                                    )}
                                                </Link>
                                            );
                                        })}
                                    </nav>
                                </div>

                                {/* Bottom Utility Bar in Mobile Drawer */}
                                <div className="space-y-4 border-t border-border pt-4">
                                    <div className="space-y-2 text-xs text-muted-foreground">
                                        {clubSettings.phone && (
                                            <a
                                                href={`tel:${clubSettings.phone.replace(/\s+/g, '')}`}
                                                className="flex items-center gap-2 hover:text-foreground"
                                            >
                                                <Phone className="size-3.5 text-primary" />
                                                <span>{clubSettings.phone}</span>
                                            </a>
                                        )}
                                        {clubSettings.email && (
                                            <a
                                                href={`mailto:${clubSettings.email}`}
                                                className="flex items-center gap-2 hover:text-foreground"
                                            >
                                                <Mail className="size-3.5 text-primary" />
                                                <span>{clubSettings.email}</span>
                                            </a>
                                        )}
                                        {clubSettings.address && (
                                            <div className="flex items-start gap-2">
                                                <MapPin className="size-3.5 shrink-0 text-primary mt-0.5" />
                                                <span>{clubSettings.address}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Social media links */}
                                    <div className="flex items-center gap-2 pt-1">
                                        {clubSettings.facebook && (
                                            <Button variant="outline" size="icon" className="size-8" asChild>
                                                <a href={clubSettings.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                                                    <Facebook className="size-3.5" />
                                                </a>
                                            </Button>
                                        )}
                                        {clubSettings.instagram && (
                                            <Button variant="outline" size="icon" className="size-8" asChild>
                                                <a href={clubSettings.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                                                    <Instagram className="size-3.5" />
                                                </a>
                                            </Button>
                                        )}
                                        {clubSettings.youtube && (
                                            <Button variant="outline" size="icon" className="size-8" asChild>
                                                <a href={clubSettings.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                                                    <Youtube className="size-3.5" />
                                                </a>
                                            </Button>
                                        )}
                                        {clubSettings.tiktok && (
                                            <Button variant="outline" size="icon" className="size-8" asChild>
                                                <a href={clubSettings.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
                                                    <TikTokIcon className="size-3.5" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>

                                    <Button variant="secondary" className="w-full text-xs font-bold" asChild>
                                        <a href="/admin">Vezérlőpult (Filament)</a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default PublicHeader;

