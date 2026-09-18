import { useState, useEffect } from 'react';

/**
 * Hook to detect scroll position and direction
 */
export function useScroll(threshold = 10) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateScroll = () => {
            const currentScrollY = window.scrollY;

            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > threshold);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return { isScrolled, scrollDirection, scrollY };
}

/**
 * Hook to detect if element is in viewport
 */
export function useInView(threshold = 0.1) {
    const [isInView, setIsInView] = useState(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold }
        );

        observer.observe(ref);
        return () => observer.disconnect();
    }, [ref, threshold]);

    return { ref: setRef, isInView };
}

/**
 * Hook to lock body scroll
 */
export function useLockBody(locked: boolean) {
    useEffect(() => {
        if (locked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [locked]);
}