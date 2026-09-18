import { useState, useEffect } from 'react';

/**
 * Hook to detect media query matches
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        // Update matches on mount
        setMatches(media.matches);

        // Create listener
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

        // Add listener
        media.addEventListener('change', listener);

        // Cleanup
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

/**
 * Predefined breakpoint hooks
 */
export function useIsMobile() {
    return useMediaQuery('(max-width: 640px)');
}

export function useIsTablet() {
    return useMediaQuery('(max-width: 1024px)');
}

export function useIsDesktop() {
    return useMediaQuery('(min-width: 1024px)');
}

export function useIsSmallDevice() {
    return useMediaQuery('(max-width: 380px)');
}