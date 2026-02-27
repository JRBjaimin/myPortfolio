import React, { useRef } from 'react';
import './Projects.css';
import { motion as Motion, useInView } from 'framer-motion';
import { LineDraw } from '../animations';

/* ── Section title with mindjoin-style word-by-word reveal ── */
function TitleReveal({ children }) {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: '-10% 0px -20% 0px', amount: 0.2 });
    const words = children.split(' ');

    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
    };
    const word = {
        hidden: { y: '105%', opacity: 0, skewY: 4 },
        visible: { y: '0%', opacity: 1, skewY: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <Motion.h2
            ref={ref}
            className="section-title"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ overflow: 'hidden' }}
        >
            {words.map((w, i) => (
                <span key={i} style={{ overflow: 'hidden', display: 'block', lineHeight: '1.05' }}>
                    <Motion.span style={{ display: 'block' }} variants={word}>{w}</Motion.span>
                </span>
            ))}
        </Motion.h2>
    );
}

const PROJECTS = [
    {
        index: '.01',
        name: 'FootballU',
        description: 'Sports coaching & strategy platform featuring an interactive whiteboard, play animations, and team management tools.',
        tags: ['React Native', 'Supabase', 'Stripe', 'Sports'],
        accent: '#40cfb0',
        link: null,
    },
    {
        index: '.02',
        name: 'BudgetFlow',
        description: 'Full-stack project billing & invoice automation SaaS. Real-time financial dashboards, multi-client project management, automated invoicing, time tracker, and expense reporting.',
        tags: ['ReactJS', 'Tailwind CSS', 'Framer Motion', 'Invoice Automation'],
        accent: '#5b8fff',
        link: 'https://budgetflow.coxplanningsolutions.com/',
    },
    {
        index: '.03',
        name: 'iWTNS',
        description: 'Emergency driver-lawyer video calling and real-time notification system for legal assistance during roadside incidents.',
        tags: ['Flutter', 'Video Calling', 'Push Notifications', 'Emergency'],
        accent: '#e85d26',
        link: null,
    },
    {
        index: '.04',
        name: 'LemonIoT',
        description: 'Android IoT device control application published on Google Play Store for managing connected hardware devices.',
        tags: ['Native Android', 'IoT', 'Play Store'],
        accent: '#f5c842',
        link: null,
    },
    {
        index: '.05',
        name: 'Neurohack',
        description: 'Meditation app with multilingual support, Text-to-Speech (TTS) integration, and in-app purchases for guided mindfulness.',
        tags: ['React Native', 'TTS', 'Multi-language', 'Meditation'],
        accent: '#c084fc',
        link: null,
    },
];

/* ── Single card — slides in from the right ── */
function ProjectCard({ project, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: '-6% 0px -18% 0px', amount: 0.2 });

    return (
        <Motion.div
            ref={ref}
            className="projects__card"
            style={{ '--accent': project.accent }}
            initial={{ y: 90, opacity: 0, scale: 0.96, rotateX: 8, clipPath: 'inset(14% 0 0 0)' }}
            animate={inView ? { y: 0, opacity: 1, scale: 1, rotateX: 0, clipPath: 'inset(0% 0 0 0)' } : { y: 90, opacity: 0, scale: 0.96, rotateX: 8, clipPath: 'inset(14% 0 0 0)' }}
            transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.1,
            }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
        >
            <div className="projects__card-glow" aria-hidden="true" />

            <div className="projects__card-top">
            <Motion.span
                    className="projects__index"
                    initial={{ x: -24, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 0.9 } : { x: -24, opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.14 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                    {project.index}
                </Motion.span>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="projects__visit">↗</a>
                )}
            </div>

            <div className="projects__hud" aria-hidden="true">
                <Motion.div
                    className="projects__hud-circle projects__hud-circle--outer"
                    initial={{ scale: 0.82, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.82, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.18 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <Motion.div
                    className="projects__hud-circle projects__hud-circle--inner"
                    initial={{ scale: 0.72, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 0.9 } : { scale: 0.72, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.24 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <Motion.div
                    className="projects__hud-center"
                    initial={{ scale: 0.2, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.2, opacity: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <Motion.div
                    className="projects__hud-beam"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.55, delay: 0.34 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                <Motion.div
                    className="projects__hud-orbit"
                    initial={{ rotate: -25, opacity: 0 }}
                    animate={inView ? { rotate: 0, opacity: 1 } : { rotate: -25, opacity: 0 }}
                    transition={{ duration: 0.65, delay: 0.38 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            <Motion.h3
                className="projects__name"
                initial={{ y: 24, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
                transition={{ duration: 0.55, delay: 0.24 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
                {project.name}
            </Motion.h3>
            <Motion.p
                className="projects__desc"
                initial={{ y: 24, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
                transition={{ duration: 0.62, delay: 0.28 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
                {project.description}
            </Motion.p>
            <div className="projects__tags">
                {project.tags.map((t, tagIndex) => (
                    <Motion.span
                        key={t}
                        className="tag projects__tag"
                        initial={{ y: 10, opacity: 0 }}
                        animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            delay: 0.34 + index * 0.08 + tagIndex * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {t}
                    </Motion.span>
                ))}
            </div>
        </Motion.div>
    );
}

export default function Projects() {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { margin: '-10% 0px -20% 0px', amount: 0.2 });

    return (
        <section id="projects" className="projects">
            <LineDraw />
            <div className="container projects__inner">
                <Motion.span
                    ref={headRef}
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                >
                    Work
                </Motion.span>

                <TitleReveal>Featured Projects</TitleReveal>

                {/* Scrolling carousel row — cards slide in from right, settle into row */}
                <div className="projects__carousel">
                    <div className="projects__strip">
                        {PROJECTS.map((p, i) => (
                            <ProjectCard key={p.name} project={p} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
