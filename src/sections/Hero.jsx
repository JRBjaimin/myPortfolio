import React, { useRef, useEffect } from 'react';
import './Hero.css';
import {
    motion as Motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useMotionTemplate
} from 'framer-motion';

/* Measures the parent el width and scales child text to exactly fill it */
function FitText({ children, className, containerRef }) {
    const textRef = useRef(null);

    useEffect(() => {
        const container = containerRef?.current;
        const text = textRef.current;
        if (!container || !text) return;

        const fit = () => {
            requestAnimationFrame(() => {
                text.style.fontSize = '20px';
                const containerW = container.getBoundingClientRect().width;
                const textW = text.getBoundingClientRect().width;
                if (containerW > 0 && textW > 0) {
                    /* dynamically scale font based on viewport width */
                    const isMobile = window.innerWidth <= 600;
                    const scaleFactor = isMobile ? 14 : 30;
                    text.style.fontSize = `${(containerW / textW) * scaleFactor}px`;
                }
            });
        };

        /* Wait for fonts to load so measurements are accurate */
        document.fonts.ready.then(fit);

        const ro = new ResizeObserver(fit);
        ro.observe(container);
        ro.observe(document.documentElement);
        return () => ro.disconnect();
    }, [containerRef]);

    return (
        <span ref={textRef} className={className} style={{ display: 'block', whiteSpace: 'nowrap', lineHeight: 1 }}>
            {children}
        </span>
    );
}

export default function Hero() {
    const containerRef = useRef(null);
    const nLetterRef = useRef(null);   /* ref on the 'N' letter span */
    const reduceMotion = useReducedMotion();
    const letters = ['J', 'A', 'I', 'M', 'I', 'N'];
    const sizeByIndex = ['hero-name-letter--lg', 'hero-name-letter--md', 'hero-name-letter--sm', 'hero-name-letter--sm', 'hero-name-letter--md', 'hero-name-letter--lg'];

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const smooth = useSpring(scrollYProgress, {
        stiffness: 74,
        damping: 22,
        restDelta: 0.001,
    });

    const end = reduceMotion ? 0.5 : 0.68;
    const nameScale = useTransform(smooth, [0, 0.12, end], [1.08, 1, 0.16]);
    const nameY = useTransform(smooth, [0, end], ['2vh', '-45vh']);
    const nameTracking = useTransform(smooth, [0, end], ['0.004em', '0.06em']);
    const nameOpacity = useTransform(smooth, [0, 0.78], [1, 0.95]);
    const nameBlur = useTransform(smooth, [0, 0.84], [0, 1.2]);
    const nameFilter = useMotionTemplate`blur(${nameBlur}px)`;

    const introOpacity = useTransform(smooth, [0, 0.32, 0.52], [1, 1, 0]);
    const outroOpacity = useTransform(smooth, [0.52, 0.74], [0, 1]);

    const bgScale = useTransform(smooth, [0, 0.76], [1, 1.11]);
    const bgY = useTransform(smooth, [0, 0.76], ['0%', '-4%']);
    const bgBrightness = useTransform(smooth, [0, 0.76], [1, 0.62]);
    const bgSaturation = useTransform(smooth, [0, 0.76], [1.08, 1.62]);
    const bgFilter = useMotionTemplate`brightness(${bgBrightness}) saturate(${bgSaturation})`;

    const overlayOpacity = useTransform(smooth, [0, 0.76], [0.18, 0.7]);
    const frameOpacity = useTransform(smooth, [0.1, 0.45], [0.25, 1]);

    return (
        <section ref={containerRef} className="hero-container" id="hero">
            <div className="hero-sticky">

                <Motion.div
                    className="hero-bg"
                    style={{ scale: bgScale, y: bgY, filter: bgFilter }}
                />

                <Motion.div className="hero-overlay" style={{ opacity: overlayOpacity }} />
                <Motion.div className="hero-frame" style={{ opacity: frameOpacity }} aria-hidden="true" />

                <Motion.h1
                    className="hero-name-wrap"
                    style={{ scale: nameScale, y: nameY, letterSpacing: nameTracking, opacity: nameOpacity, filter: nameFilter }}
                >
                    <span className="hero-name-row">
                        <span className="hero-name-text" aria-label="Jaimin">
                            {letters.map((letter, index) => (
                                index === letters.length - 1 ? (
                                    /* Last letter 'N' — attach ref so BHARUCHA can measure its width */
                                    <span
                                        key={`${letter}-${index}`}
                                        ref={nLetterRef}
                                        className={`hero-name-letter ${sizeByIndex[index]} hero-name-letter--with-subname`}
                                        aria-hidden="true"
                                    >
                                        <span className="hero-name-letter-glyph">{letter}</span>
                                        {/* BHARUCHA auto-fits to exact width of the N letter container */}
                                        <span className="hero-name-surname">
                                            <FitText containerRef={nLetterRef} className="hero-name-surname-text">
                                                BHARUCHA
                                            </FitText>
                                        </span>
                                    </span>
                                ) : (
                                    <span
                                        key={`${letter}-${index}`}
                                        className={`hero-name-letter ${sizeByIndex[index]}`}
                                        aria-hidden="true"
                                    >
                                        <span className="hero-name-letter-glyph">{letter}</span>
                                    </span>
                                )
                            ))}
                        </span>
                    </span>
                </Motion.h1>

                <Motion.div
                    className="hero-info hero-info--intro"
                    style={{ opacity: introOpacity }}
                >
                    <p className="hero-info-role">Senior Mobile Application Developer</p>
                    <div className="hero-info-stack">
                        <span>React Native</span>
                        <span className="hero-info-dash">——</span>
                        <span>Flutter</span>
                        <span className="hero-info-dash">——</span>
                        <span>Cross-Platform</span>
                    </div>
                </Motion.div>

                <Motion.p className="hero-outro-tagline" style={{ opacity: outroOpacity }}>
                    WHERE DESIGN MEETS EXECUTION.
                </Motion.p>

                <div className="hero-grid" aria-hidden="true">
                    {[...Array(4)].map((_, i) => <div key={i} className="hero-grid-col" />)}
                </div>
            </div>
        </section>
    );
}
