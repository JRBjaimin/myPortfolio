import React from 'react';
import './Contact.css';
import { FadeUp, ClipReveal, LineDraw } from '../animations';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const LINKS = [
    { label: 'Email', value: 'jaiminbharucha009@gmail.com', href: 'mailto:jaiminbharucha009@gmail.com' },
    { label: 'Phone', value: '+91 88493 98698', href: 'tel:+918849398698' },
    { label: 'LinkedIn', value: 'linkedin.com/in/jaimin-bharucha-730660150', href: 'https://www.linkedin.com/in/jaimin-bharucha-730660150?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { label: 'GitHub', value: 'github.com/JRBjaimin', href: 'https://github.com/JRBjaimin?tab=repositories' },
    { label: 'Location', value: 'Surat, India', href: null },
];

function useBidirectional(ref) {
    const [inView, setInView] = useState(false);
    const { scrollY } = useScroll();
    const prevY = useRef(null);

    useMotionValueEvent(scrollY, 'change', (y) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollingDown = prevY.current === null ? true : y > prevY.current;
        prevY.current = y;

        if (scrollingDown) {
            if (rect.top < vh * 0.88 && rect.bottom > 0) setInView(true);
        } else {
            if (rect.top > vh * 0.72) setInView(false);
            else if (rect.top < vh * 0.88 && rect.bottom > 0) setInView(true);
        }
    });

    useEffect(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.88 && rect.bottom > 0) setInView(true);
    }, []);

    return inView;
}

function ContactRow({ link, index }) {
    const ref = useRef(null);
    const inView = useBidirectional(ref);
    return (
        <motion.div
            ref={ref}
            className="contact__row"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: index * 0.06 }}
        >
            <span className="contact__row-label">{link.label}</span>
            {link.href ? (
                <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="contact__row-value contact__row-value--link"
                >
                    {link.value}
                </a>
            ) : (
                <span className="contact__row-value">{link.value}</span>
            )}
        </motion.div>
    );
}

export default function Contact() {
    const [visitorCount, setVisitorCount] = useState(null);

    useEffect(() => {
        const namespace = 'jaiminbharucha-portfolio';
        const counterName = 'site-visitors';

        const parseCount = (payload) => {
            if (!payload || typeof payload !== 'object') return null;
            const possible = [
                payload.count,
                payload.Count,
                payload.value,
                payload.Value,
                payload.data?.count,
                payload.data?.Count,
                payload.data?.value,
                payload.data?.Value,
            ];
            const hit = possible.find((v) => Number.isFinite(Number(v)));
            return hit === undefined ? null : Number(hit);
        };

        const fetchCounter = async () => {
            try {
                const upRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${counterName}/up`);
                const upJson = await upRes.json();
                const upValue = parseCount(upJson);
                if (Number.isFinite(upValue)) {
                    setVisitorCount(upValue);
                    return;
                }
            } catch {
                /* ignore and try read endpoint */
            }

            try {
                const getRes = await fetch(`https://api.counterapi.dev/v1/${namespace}/${counterName}`);
                const getJson = await getRes.json();
                const getValue = parseCount(getJson);
                if (Number.isFinite(getValue)) setVisitorCount(getValue);
            } catch {
                setVisitorCount(null);
            }
        };

        fetchCounter();
    }, []);

    return (
        <section id="contact" className="contact">
            <LineDraw />
            <div className="container contact__top">
                <FadeUp><span className="eyebrow">Contact</span></FadeUp>
                <h2 className="contact__headline">
                    <ClipReveal delay={0.05}>Let's build</ClipReveal>
                    <ClipReveal delay={0.15}><em>something.</em></ClipReveal>
                </h2>
                <FadeUp delay={0.25}>
                    <a href="mailto:jaiminbharucha009@gmail.com" className="contact__cta">
                        Get in touch <span className="contact__cta-arrow">↗</span>
                    </a>
                </FadeUp>
            </div>

            <LineDraw delay={0.1} />
            <div className="container contact__links">
                {LINKS.map((l, i) => (
                    <ContactRow key={l.label} link={l} index={i} />
                ))}
            </div>

            <LineDraw delay={0.05} />
            <div className="container contact__footer">
                <div className="contact__footer-right">
                    <span className="contact__footer-name">JAIMIN BHARUCHA</span>
                    <span className="contact__footer-visitors">
                        VISITORS: {visitorCount === null ? '--' : visitorCount.toLocaleString()}
                    </span>
                    <button
                        className="contact__footer-top"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        id="scroll-top-btn"
                    >
                        ↑ Top
                    </button>
                </div>
            </div>
        </section>
    );
}
