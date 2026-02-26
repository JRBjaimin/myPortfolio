import React from 'react';
import './Skills.css';
import { FadeUp, ClipReveal, LineDraw } from '../animations';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const SKILLS = [
    { label: 'Mobile Development', items: ['React Native CLI', 'React Native Expo', 'Flutter'] },
    { label: 'Web Development', items: ['ReactJS'] },
    { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Dart', 'Java', 'Swift'] },
    { label: 'State Management', items: ['Redux Toolkit', 'React Hooks', 'Provider'] },
    { label: 'Architecture', items: ['MVVM', 'Clean Architecture'] },
    { label: 'Backend & Cloud', items: ['Firebase', 'Supabase', 'RESTful APIs'] },
    { label: 'Databases', items: ['Firebase Firestore', 'MySQL', 'SQL'] },
    { label: 'Payments & Push', items: ['Stripe', 'Firebase Cloud Messaging'] },
    { label: 'Testing', items: ['Unit Testing', 'Integration Testing'] },
    { label: 'Tools & Platforms', items: ['Git', 'Postman', 'CI/CD', 'Play Console', 'App Store Connect'] },
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

function SkillRow({ cat, index }) {
    const ref = useRef(null);
    const inView = useBidirectional(ref);
    return (
        <motion.div
            ref={ref}
            className="skills__row"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1], delay: index * 0.04 }}
        >
            <span className="skills__cat">{cat.label}</span>
            <div className="skills__tags">
                {cat.items.map((item, ti) => (
                    <motion.span
                        key={item}
                        className="tag"
                        initial={{ opacity: 0, scale: 0.88 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: index * 0.04 + ti * 0.05 }}
                    >
                        {item}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}

export default function Skills() {
    return (
        <section id="skills" className="skills">
            <LineDraw />
            <div className="container skills__inner">
                <FadeUp><span className="eyebrow">Expertise</span></FadeUp>
                <h2 className="section-title">
                    <ClipReveal delay={0.05}>Skills &amp;</ClipReveal>
                    <ClipReveal delay={0.15}>Technologies</ClipReveal>
                </h2>
                <div className="skills__grid">
                    {SKILLS.map((cat, i) => (
                        <SkillRow key={cat.label} cat={cat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
