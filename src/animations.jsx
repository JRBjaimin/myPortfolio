/**
 * Bidirectional scroll animations — scroll-direction aware
 *
 * PROBLEM WITH useInView approach:
 *   When scrolling UP, elements exit viewport from the TOP → animation plays but is invisible.
 *   We need to detect scroll direction explicitly and hide elements while they're still on screen.
 *
 * SOLUTION: useBidirectionalView hook
 *   - Scroll DOWN + element entering viewport → inView = true  → animate IN
 *   - Scroll UP   + element's top > 70% of viewport → inView = false → animate OUT (still visible!)
 */
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/* ─────────────────────────────────────────────
   CORE HOOK — scroll-direction aware in-view detection
   exitAt: fraction of viewport height at which element starts hiding on scroll-up (default 0.72)
   enterAt: fraction of viewport height at which element shows on scroll-down (default 0.88)
───────────────────────────────────────────── */
function useBidirectionalView(ref, { enterAt = 0.88, exitAt = 0.85, delay = 0 } = {}) {
    const [inView, setInView] = useState(false);
    const { scrollY } = useScroll();
    const prevY = useRef(null);

    /* Check if element is currently physically visible on screen */
    const checkElement = (scrollingDown) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        if (scrollingDown) {
            /* Animate IN when element enters viewport from bottom */
            if (rect.top < vh * enterAt && rect.bottom > 0) {
                setInView(true);
            }
        } else {
            /* Animate OUT when element's top drifts into bottom of screen while scrolling up */
            if (rect.top > vh * exitAt) {
                setInView(false);
                /* Re-show if element re-enters from top (scrolling up past something above) */
            } else if (rect.top < vh * enterAt && rect.bottom > vh * 0.1) {
                setInView(true);
            }
        }
    };

    useMotionValueEvent(scrollY, 'change', (y) => {
        const scrollingDown = prevY.current === null ? true : y > prevY.current;
        prevY.current = y;
        checkElement(scrollingDown);
    });

    /* Run once on mount for items already in viewport */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh * enterAt && rect.bottom > 0) {
            setInView(true);
        }
    }, []);

    return inView;
}

/* ─────────────────────────────────────────────
   FADE UP  — generic fade + translate
───────────────────────────────────────────── */
export function FadeUp({ children, delay = 0, duration = 0.72, y = 40, className = '' }) {
    const ref = useRef(null);
    const inView = useBidirectionalView(ref);
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={inView
                ? { duration, ease: [0.4, 0, 0.2, 1], delay }
                : { duration: 0.55, ease: [0.4, 0, 0.6, 1] }}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   CLIP REVEAL  — text slides up from behind a mask (mindjoin heading style)
   On scroll-up: slides back DOWN behind the mask while still on screen
───────────────────────────────────────────── */
export function ClipReveal({ children, delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useBidirectionalView(ref, { enterAt: 0.9, exitAt: 0.88 });
    return (
        <div ref={ref} className={`clip-reveal-wrap ${className}`} style={{ overflow: 'hidden' }}>
            <motion.div
                initial={{ y: '100%' }}
                animate={inView ? { y: '0%' } : { y: '100%' }}
                transition={inView
                    ? { duration: 0.82, ease: [0.76, 0, 0.24, 1], delay }
                    : { duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   STAGGER CONTAINER + ITEM
───────────────────────────────────────────── */
export const staggerContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

export const staggerItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: 40, transition: { duration: 0.5, ease: [0.4, 0, 0.6, 1] } },
};

export function StaggerList({ children, className = '' }) {
    const ref = useRef(null);
    const inView = useBidirectionalView(ref);
    return (
        <motion.div
            ref={ref}
            className={className}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'show' : 'exit'}
        >
            {children}
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   LINE DRAW  — draws in on scroll-down, shrinks on scroll-up
───────────────────────────────────────────── */
export function LineDraw({ delay = 0, className = '' }) {
    const ref = useRef(null);
    const inView = useBidirectionalView(ref, { enterAt: 0.95, exitAt: 0.92 });
    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ height: '1px', background: 'var(--grid-line)' }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={inView
                ? { duration: 1.0, ease: [0.76, 0, 0.24, 1], delay }
                : { duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
    );
}
