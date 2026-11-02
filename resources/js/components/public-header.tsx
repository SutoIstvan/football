import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Facebook,
    Globe,
    Instagram,
    Mail,
    MapPin,
    Menu,
    Phone,
    Search,
    Shield,
    X,
    Youtube,
} from 'lucide-react';
import React, { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
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
    url?: string | null;
    route_name?: string | null;
    resolved_url?: string;
    opens_in_new_tab?: boolean;
    children?: NavigationItem[];
}

export interface NavItem {
    id?: number;
    label: string;
    href: string;
    target?: string;
    children?: NavItem[];
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

const defaultNavLinks: NavItem[] = [
    { label: 'Főoldal', href: '/' },
    { label: 'Hírek', href: '/hirek' },
    {
        label: 'Csapat',
        href: '/csapat',
        children: [
            { label: 'Első csapat', href: '/csapat' },
            { label: 'Szakmai stáb', href: '/csapat#stab' },
        ],
    },
    {
        label: 'Mérkőzések',
        href: '/merkozesek',
        children: [
            { label: 'Mérkőzések & Eredmények', href: '/merkozesek' },
            { label: 'Tabella', href: '/tabella' },
        ],
    },
    { label: 'Tabella', href: '/tabella' },
    { label: 'Média', href: '/media' },
    {
        label: 'Klub',
        href: '/tortenet',
        children: [
            { label: 'Történet', href: '/tortenet' },
            { label: 'Stadion', href: '/stadion' },
            { label: 'Támogatók', href: '/tamogatok' },
        ],
    },
    { label: 'Stadion', href: '/stadion' },
    { label: 'Kapcsolat', href: '/kapcsolat' },
];

const routeNameToUrl: Record<string, string> = {
    'home': '/',
    'articles.index': '/hirek',
    'team.index': '/csapat',
    'matches.index': '/merkozesek',
    'standings.index': '/tabella',
    'galleries.index': '/media',
    'sponsors.index': '/tamogatok',
};

function resolveItemHref(item: NavigationItem): string {
    if (item.resolved_url) {
        return item.resolved_url;
    }
    if (item.url) {
        return item.url;
    }
    if (item.route_name) {
        if (routeNameToUrl[item.route_name]) {
            return routeNameToUrl[item.route_name];
        }
        return `/${item.route_name.replace(/^\//, '')}`;
    }
    return '#';
}

function mapNavigationItem(item: NavigationItem): NavItem {
    const hasChildren = Array.isArray(item.children) && item.children.length > 0;
    return {
        id: item.id,
        label: item.title,
        href: resolveItemHref(item),
        target: item.opens_in_new_tab ? '_blank' : undefined,
        children: hasChildren ? item.children!.map(mapNavigationItem) : undefined,
    };
}

export function PublicHeader({ clubSettings: initialClubSettings, navigation }: PublicHeaderProps) {
    const page = usePage();
    const currentPath = page.url || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const [mobileOpen, setMobileOpen] = useState(false);

    const initialQuery = React.useMemo(() => {
        if (!page.url) return '';
        try {
            const urlObj = new URL(page.url, 'http://localhost');
            return urlObj.searchParams.get('q') || '';
        } catch {
            return '';
        }
    }, [page.url]);

    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);

    React.useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchQuery.trim();
        router.get('/hirek', trimmed ? { q: trimmed } : undefined);
        setMobileOpen(false);
        setSearchDialogOpen(false);
    };

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

    const navItems: NavItem[] =
        navigation?.header && navigation.header.length > 0
            ? navigation.header.map(mapNavigationItem)
            : defaultNavLinks;

    const isLinkActive = (href: string) => {
        if (!href || href === '#') {
            return false;
        }
        const cleanHref = href.split('?')[0].split('#')[0];
        const cleanCurrentPath = currentPath.split('?')[0].split('#')[0];

        if (cleanHref === '/') {
            return cleanCurrentPath === '/' || cleanCurrentPath === '';
        }
        return (
            cleanCurrentPath === cleanHref ||
            cleanCurrentPath.startsWith(`${cleanHref}/`)
        );
    };

    const isItemOrChildActive = (item: NavItem): boolean => {
        if (isLinkActive(item.href)) {
            return true;
        }
        if (item.children && item.children.length > 0) {
            return item.children.some((child) => isItemOrChildActive(child));
        }
        return false;
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
                            <div className="font-bold text-[#41ad49] ml-3 text-xl">PAKSI FC A MAGYAR CSAPAT</div>



                            {/* Separator */}
                            <Separator orientation="vertical" className="h-3" />

                            {/* Social Media Links with Tooltips */}
                            <TooltipProvider delayDuration={200}>
                                <div className="flex items-center gap-6">
                                    {clubSettings.facebook && (
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="size-7 text-muted-foreground hover:text-green-600"
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
                                                    className="size-7 text-muted-foreground hover:text-green-600"
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
                                                    className="size-7 text-muted-foreground hover:text-green-600"
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
                                                    className="size-7 text-muted-foreground hover:text-green-600"
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
                            <nav className="flex flex-1 items-center justify-start gap-1 flex-wrap">
                                {navItems.map((item, idx) => {
                                    const hasChildren = Boolean(item.children && item.children.length > 0);
                                    const active = isItemOrChildActive(item);
                                    const itemKey = item.id ? String(item.id) : `nav-${idx}`;

                                    if (hasChildren) {
                                        return (
                                            <div
                                                key={itemKey}
                                                className="relative group inline-flex items-center"
                                            >
                                                <Link
                                                    href={item.href || '#'}
                                                    target={item.target}
                                                    className={cn(
                                                        'inline-flex h-8 items-center justify-center gap-1 rounded-md px-3 text-sm tracking-wide transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring select-none',
                                                        active
                                                            ? 'bg-primary text-primary-foreground shadow-xs'
                                                            : 'text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground'
                                                    )}
                                                >
                                                    <span>{item.label}</span>
                                                    <ChevronDown
                                                        className="size-3 text-muted-foreground transition-transform duration-200 group-hover:rotate-180 group-hover:text-foreground"
                                                        aria-hidden="true"
                                                    />
                                                </Link>

                                                {/* Dropdown panel - precisely aligned to left (left-0), with pt-1.5 bridge to prevent hover loss */}
                                                <div className="absolute left-0 top-full pt-1.5 z-50 pointer-events-none opacity-0 translate-y-1 transition-all duration-150 ease-out group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0">
                                                    <div className="min-w-[280px] w-max max-w-md p-1.5 shadow-xl border border-border/80 bg-popover text-popover-foreground rounded-lg">
                                                        <div className="flex flex-col gap-0.5 text-left">
                                                            {item.href && item.href !== '#' && (
                                                                <>
                                                                    <Link
                                                                        href={item.href}
                                                                        target={item.target}
                                                                        className={cn(
                                                                            'flex w-full items-center justify-between gap-3 text-left rounded-md px-3 py-2 text-xs font-bold transition-colors hover:bg-accent hover:text-accent-foreground',
                                                                            isLinkActive(item.href) && 'bg-primary/10 text-primary'
                                                                        )}
                                                                    >
                                                                        <span className="text-left">{item.label}</span>
                                                                        <Badge variant="secondary" className="text-[10px] py-0 px-2 font-normal shrink-0">
                                                                            Főoldal
                                                                        </Badge>
                                                                    </Link>
                                                                    <Separator className="my-1" />
                                                                </>
                                                            )}
                                                            {item.children!.map((child, childIdx) => {
                                                                const childActive = isLinkActive(child.href);
                                                                return (
                                                                    <Link
                                                                        key={child.id ?? `child-${childIdx}`}
                                                                        href={child.href}
                                                                        target={child.target}
                                                                        className={cn(
                                                                            'flex w-full items-center justify-start text-left gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground',
                                                                            childActive && 'bg-primary/10 text-primary font-bold'
                                                                        )}
                                                                    >
                                                                        <span className="text-left leading-snug">{child.label}</span>
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={itemKey}
                                            href={item.href}
                                            target={item.target}
                                            className={cn(
                                                'inline-flex h-8 items-center justify-center rounded-md px-3 text-sm tracking-wide transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring select-none',
                                                active
                                                    ? 'bg-gray-100 shadow-xs hover:bg-gray-400'
                                                    : 'text-gray-600 hover:bg-accent hover:text-accent-foreground'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            {/* Search input (shadcn) */}
                            <div className="ml-4 flex shrink-0 items-center">
                                <form onSubmit={handleSearch} className="relative flex items-center">
                                    <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Keresés..."
                                        className="h-8 w-44 rounded-md bg-muted/40 pl-8 pr-7 text-xs transition-all duration-200 hover:bg-muted/70 focus:w-60 focus:bg-background xl:w-52 [&::-webkit-search-cancel-button]:hidden"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                                            aria-label="Keresés törlése"
                                        >
                                            <X className="size-3" />
                                        </button>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE / TABLET CONTROLS */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="size-9"
                                    aria-label="Keresés megnyitása"
                                >
                                    <Search className="size-4 text-muted-foreground" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="p-5 sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-base font-semibold">Keresés</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSearch} className="relative mt-2 flex gap-2">
                                    <div className="relative flex-1">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Keresés a hírekben..."
                                            className="h-10 pl-9 pr-8 text-sm [&::-webkit-search-cancel-button]:hidden"
                                            autoFocus
                                        />
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                aria-label="Keresés törlése"
                                            >
                                                <X className="size-4" />
                                            </button>
                                        )}
                                    </div>
                                    <Button type="submit" className="h-10 px-4 bg-[#006B3F] hover:bg-[#005432] text-white">
                                        Keresés
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>

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

                                    {/* Mobile Drawer Search */}
                                    <form onSubmit={handleSearch} className="relative">
                                        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Keresés a hírekben..."
                                            className="h-9 pl-9 pr-8 text-xs [&::-webkit-search-cancel-button]:hidden"
                                        />
                                        {searchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => setSearchQuery('')}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                                                aria-label="Keresés törlése"
                                            >
                                                <X className="size-3.5" />
                                            </button>
                                        )}
                                    </form>

                                    {/* Navigation links */}
                                    <nav className="flex flex-col space-y-1">
                                        {navItems.map((item, idx) => {
                                            const hasChildren = Boolean(item.children && item.children.length > 0);
                                            const active = isLinkActive(item.href);
                                            const childOrItemActive = isItemOrChildActive(item);

                                            if (hasChildren) {
                                                return (
                                                    <Collapsible
                                                        key={item.id ?? `mobile-nav-${idx}`}
                                                        defaultOpen={childOrItemActive}
                                                        className="group/collapsible w-full"
                                                    >
                                                        <div
                                                            className={cn(
                                                                'flex items-center justify-between rounded-md px-1 py-0.5 text-sm font-semibold transition-colors',
                                                                active
                                                                    ? 'bg-primary text-primary-foreground'
                                                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                            )}
                                                        >
                                                            {item.href && item.href !== '#' ? (
                                                                <Link
                                                                    href={item.href}
                                                                    target={item.target}
                                                                    onClick={() => setMobileOpen(false)}
                                                                    className="flex-1 px-2 py-1.5"
                                                                >
                                                                    {item.label}
                                                                </Link>
                                                            ) : (
                                                                <span className="flex-1 px-2 py-1.5 select-none">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                            <CollapsibleTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className={cn(
                                                                        'size-8 p-0 text-inherit hover:bg-transparent',
                                                                        active ? 'hover:bg-primary-foreground/10' : ''
                                                                    )}
                                                                    aria-label={`${item.label} almenü kibontása`}
                                                                >
                                                                    <ChevronDown className="size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                                                                </Button>
                                                            </CollapsibleTrigger>
                                                        </div>

                                                        <CollapsibleContent className="space-y-1 pl-3 pt-1 ml-3 border-l-2 border-border/60 text-left">
                                                            {item.href && item.href !== '#' && (
                                                                <Link
                                                                    href={item.href}
                                                                    target={item.target}
                                                                    onClick={() => setMobileOpen(false)}
                                                                    className={cn(
                                                                        'flex items-center justify-start text-left rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                                                                        active
                                                                            ? 'bg-primary/10 text-primary font-bold'
                                                                            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                                    )}
                                                                >
                                                                    <span className="text-left">{item.label} (Főoldal)</span>
                                                                </Link>
                                                            )}
                                                            {item.children!.map((child, childIdx) => {
                                                                const childActive = isLinkActive(child.href);
                                                                return (
                                                                    <Link
                                                                        key={child.id ?? `mobile-child-${childIdx}`}
                                                                        href={child.href}
                                                                        target={child.target}
                                                                        onClick={() => setMobileOpen(false)}
                                                                        className={cn(
                                                                            'flex items-center justify-between text-left gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
                                                                            childActive
                                                                                ? 'bg-primary/10 text-primary font-bold'
                                                                                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                                                        )}
                                                                    >
                                                                        <span className="text-left">{child.label}</span>
                                                                        {childActive && (
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="h-4 border-primary/30 text-[9px] text-primary shrink-0"
                                                                            >
                                                                                Aktív
                                                                            </Badge>
                                                                        )}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </CollapsibleContent>
                                                    </Collapsible>
                                                );
                                            }

                                            return (
                                                <Link
                                                    key={item.id ?? `mobile-nav-${idx}`}
                                                    href={item.href}
                                                    target={item.target}
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

