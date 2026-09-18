"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, ChevronDown, Search, User, Heart, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { useLockBody } from '@/hooks/use-scroll';


// ============================================
// TYPES & INTERFACES
// ============================================

interface NavItem {
    label: string;
    href: string;
    dropdown?: NavDropdownItem[];
}

interface NavDropdownItem {
    label: string;
    href: string;
    description?: string;
    icon?: React.ReactNode;
}

// ============================================
// NAVIGATION DATA
// ============================================

const navItems: NavItem[] = [
    { label: 'Buy', href: '/buy' },
    { label: 'Sell', href: '/sell' },
    {
        label: 'Destinations',
        href: '/destinations',
        dropdown: [
            { label: 'New York', href: '/destinations/new-york', description: 'Luxury apartments & penthouses' },
            { label: 'Los Angeles', href: '/destinations/los-angeles', description: 'Modern villas & beach houses' },
            { label: 'Miami', href: '/destinations/miami', description: 'Waterfront properties' },
            { label: 'London', href: '/destinations/london', description: 'Historic & contemporary homes' },
            { label: 'Dubai', href: '/destinations/dubai', description: 'Ultra-luxury residences' },
        ],
    },
    { label: 'Your Life Project', href: '/life-project' },
    { label: 'Invest', href: '/invest' },
    { label: 'Angels', href: '/angels' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const navbarVariants = {
    hidden: {
        y: -100,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

const mobileMenuVariants = {
    closed: {
        opacity: 0,
        x: '100%',
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1] as const,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
            staggerChildren: 0.07,
            delayChildren: 0.1,
        },
    },
};

const mobileNavItemVariants = {
    closed: {
        opacity: 0,
        x: 50,
        transition: {
            duration: 0.2,
        },
    },
    open: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    },
};

const dropdownVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.15,
            ease: 'easeIn' as const,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeOut' as const,
        },
    },
};

const overlayVariants = {
    hidden: {
        opacity: 0,
        transition: {
            duration: 0.3,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

// ============================================
// LOGO COMPONENT
// ============================================

const Logo = ({ isScrolled }: { isScrolled: boolean }) => (
    <Link
        href="/"
        className="relative flex items-center gap-2 group"
        aria-label={`${siteConfig.name} - Home`}
    >
        <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
            {/* Logo Icon */}
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                <svg
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                >
                    <path
                        d="M12 8h24v6l-14 14h14v6H12v-6l14-14H12V8z"
                        fill="url(#logo-gradient)"
                        className="transition-all duration-300"
                    />
                    <defs>
                        <linearGradient id="logo-gradient" x1="12" y1="8" x2="36" y2="40">
                            <stop offset="0%" stopColor="#2E86C1" />
                            <stop offset="100%" stopColor="#5DADE2" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </motion.div>

        {/* Logo Text */}
        <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
        >
            <span
                className={cn(
                    'text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300',
                    'bg-gradient-to-r from-[#2E86C1] to-[#5DADE2] bg-clip-text text-transparent'
                )}
            >
                MORROW
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium -mt-1">
                Real Estate
            </span>
        </motion.div>
    </Link>
);

// ============================================
// DESKTOP NAV ITEM COMPONENT
// ============================================

const DesktopNavItem = ({ item, isActive }: { item: NavItem; isActive: boolean }) => {
    const [isHovered, setIsHovered] = useState(false);
    const hasDropdown = !!item.dropdown;

    return (
        <motion.div
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Link
                href={item.href}
                className={cn(
                    'relative flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200',
                    'rounded-lg group',
                    isActive
                        ? 'text-[#2E86C1]'
                        : 'text-gray-700 hover:text-[#2E86C1]'
                )}
            >
                {/* Hover Background */}
                <motion.span
                    className="absolute inset-0 bg-[#2E86C1]/5 rounded-lg -z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                    transition={{ duration: 0.2 }}
                />

                <span className="relative">
                    {item.label}
                    {/* Active Indicator */}
                    {isActive && (
                        <motion.span
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2E86C1] to-[#5DADE2] rounded-full"
                            layoutId="activeNavIndicator"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                    )}
                </span>

                {hasDropdown && (
                    <motion.span
                        animate={{ rotate: isHovered ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronDown className="w-3.5 h-3.5" />
                    </motion.span>
                )}
            </Link>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {hasDropdown && isHovered && (
                    <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute top-full left-0 mt-2 w-72 origin-top-left"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {/* Dropdown Arrow */}
                            <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

                            <div className="relative p-2">
                                {item.dropdown?.map((dropdownItem, index) => (
                                    <motion.div
                                        key={dropdownItem.href}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            href={dropdownItem.href}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#2E86C1]/5 transition-colors duration-200 group/item"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 group-hover/item:text-[#2E86C1] transition-colors">
                                                    {dropdownItem.label}
                                                </p>
                                                {dropdownItem.description && (
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {dropdownItem.description}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ============================================
// MOBILE NAV ITEM COMPONENT
// ============================================

const MobileNavItem = ({ item, isActive, onClose }: { item: NavItem; isActive: boolean; onClose: () => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasDropdown = !!item.dropdown;

    return (
        <motion.div variants={mobileNavItemVariants} className="overflow-hidden">
            {hasDropdown ? (
                <div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={cn(
                            'w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                            isActive ? 'text-[#2E86C1] bg-[#2E86C1]/5' : 'text-gray-700 hover:bg-gray-50'
                        )}
                    >
                        <span>{item.label}</span>
                        <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pl-4 py-2 space-y-1">
                                    {item.dropdown?.map((dropdownItem) => (
                                        <Link
                                            key={dropdownItem.href}
                                            href={dropdownItem.href}
                                            onClick={onClose}
                                            className="block px-4 py-2.5 text-sm text-gray-600 hover:text-[#2E86C1] hover:bg-[#2E86C1]/5 rounded-lg transition-colors"
                                        >
                                            {dropdownItem.label}
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                        'block px-4 py-3.5 rounded-xl text-base font-medium transition-colors',
                        isActive
                            ? 'text-[#2E86C1] bg-[#2E86C1]/5'
                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                    )}
                >
                    {item.label}
                </Link>
            )}
        </motion.div>
    );
};

// ============================================
// MAIN NAVBAR COMPONENT
// ============================================

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const pathname = usePathname();

    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setIsScrolled(latest > 50);

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    // Lock body scroll when mobile menu is open
    useLockBody(isMobileMenuOpen);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Close mobile menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const isActiveRoute = useCallback(
        (href: string) => {
            if (href === '/') return pathname === '/';
            return pathname.startsWith(href);
        },
        [pathname]
    );

    return (
        <>
            {/* Main Navbar */}
            <motion.header
                variants={navbarVariants}
                initial="hidden"
                animate={hidden ? 'hidden' : 'visible'}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-gray-100'
                        : 'bg-transparent'
                )}
            >
                <nav className="container-custom">
                    <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                        {/* Logo */}
                        <Logo isScrolled={isScrolled} />

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
                            {navItems.map((item) => (
                                <DesktopNavItem
                                    key={item.href}
                                    item={item}
                                    isActive={isActiveRoute(item.href)}
                                />
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Search Button */}
                            <motion.button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-[#2E86C1] hover:bg-[#2E86C1]/5 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Search"
                            >
                                <Search className="w-5 h-5" />
                            </motion.button>

                            {/* Auth Buttons - Desktop */}
                            <div className="hidden lg:flex items-center gap-2.5">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/login"
                                        className={cn(
                                            'px-5 py-5 text-sm font-semibold rounded-full border-2 transition-all duration-200',
                                            'border-[#2E86C1] text-[#2E86C1] hover:bg-[#2E86C1] hover:text-white',
                                            'shadow-sm hover:shadow-md'
                                        )}
                                    >
                                        Login
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Link
                                        href="/start"
                                        className={cn(
                                            'px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-200',
                                            'bg-gradient-to-r from-[#2E86C1] to-[#2874A6] text-white',
                                            'shadow-md shadow-[#2E86C1]/25 hover:shadow-lg hover:shadow-[#2E86C1]/30',
                                            'hover:from-[#2874A6] hover:to-[#21618C]'
                                        )}
                                    >
                                        Start
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Mobile Menu Toggle */}
                            <motion.button
                                onClick={toggleMobileMenu}
                                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                                whileTap={{ scale: 0.95 }}
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.span
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="w-6 h-6" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Menu className="w-6 h-6" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </nav>

                {/* Search Bar - Expandable */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="hidden md:block border-t border-gray-100 bg-white/95 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="container-custom py-4">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-full px-5 py-3 border border-gray-200 focus-within:border-[#2E86C1] focus-within:ring-2 focus-within:ring-[#2E86C1]/20 transition-all">
                                    <Search className="w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search properties, locations, or investments..."
                                        className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                                        autoFocus
                                    />
                                    <button className="px-4 py-1.5 bg-[#2E86C1] text-white text-sm font-medium rounded-full hover:bg-[#2874A6] transition-colors">
                                        Search
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className={cn(
                                'fixed top-0 right-0 bottom-0 z-50 w-full sm:w-80',
                                'bg-white shadow-2xl lg:hidden',
                                'flex flex-col'
                            )}
                        >
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                <Logo isScrolled={false} />
                                <motion.button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Close menu"
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Mobile Navigation Links */}
                            <div className="flex-1 overflow-y-auto py-4 px-3">
                                <nav className="space-y-1">
                                    {navItems.map((item) => (
                                        <MobileNavItem
                                            key={item.href}
                                            item={item}
                                            isActive={isActiveRoute(item.href)}
                                            onClose={() => setIsMobileMenuOpen(false)}
                                        />
                                    ))}
                                </nav>
                            </div>

                            {/* Mobile Auth Buttons */}
                            <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50/50">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-5.5 text-sm font-semibold text-[#2E86C1] border-2 border-[#2E86C1] rounded-full hover:bg-[#2E86C1] hover:text-white transition-all duration-200"
                                >
                                    <User className="w-4 h-4" />
                                    Login
                                </Link>
                                <Link
                                    href="/start"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-[#2E86C1] to-[#2874A6] rounded-full shadow-lg shadow-[#2E86C1]/25 hover:shadow-xl transition-all duration-200"
                                >
                                    Start Your Journey
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}