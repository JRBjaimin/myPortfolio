import React, { useRef, useState, useEffect } from 'react';
import './Projects.css';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { LineDraw } from '../animations';

function useBidirectional(ref, enterAt = 0.88, exitAt = 0.72) {
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
            if (rect.top < vh * enterAt && rect.bottom > 0) setInView(true);
        } else {
            if (rect.top > vh * exitAt) setInView(false);
            else if (rect.top < vh * enterAt && rect.bottom > 0) setInView(true);
        }
    });

    useEffect(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * enterAt && rect.bottom > 0) setInView(true);
    }, []);

    return inView;
}

/* ── Section title with mindjoin-style word-by-word reveal ── */
function TitleReveal({ children }) {
    const ref = useRef(null);
    const inView = useBidirectional(ref, 0.9, 0.75);
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
        <motion.h2
            ref={ref}
            className="section-title"
            variants={container}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ overflow: 'hidden' }}
        >
            {words.map((w, i) => (
                <span key={i} style={{ overflow: 'hidden', display: 'block', lineHeight: '1.05' }}>
                    <motion.span style={{ display: 'block' }} variants={word}>{w}</motion.span>
                </span>
            ))}
        </motion.h2>
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
    const inView = useBidirectional(ref);

    return (
        <motion.div
            ref={ref}
            className="projects__card"
            style={{ '--accent': project.accent }}
            initial={{ x: 160, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : { x: 160, opacity: 0 }}
            transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12, /* stagger — cards sweep in one by one from right */
            }}
        >
            <div className="projects__card-top">
                <span className="projects__index">{project.index}</span>
                {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="projects__visit">↗</a>
                )}
            </div>

            {/* Data-viz bars */}
            <div className="projects__bars" aria-hidden="true">
                {[...Array(5)].map((_, j) => (
                    <div key={j} className="projects__bar" style={{ height: `${20 + j * 12}px` }} />
                ))}
            </div>

            <h3 className="projects__name">{project.name}</h3>
            <p className="projects__desc">{project.description}</p>
            <div className="projects__tags">
                {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
        </motion.div>
    );
}

export default function Projects() {
    const headRef = useRef(null);
    const headInView = useBidirectional(headRef, 0.9, 0.75);

    return (
        <section id="projects" className="projects">
            <LineDraw />
            <div className="container projects__inner">
                <motion.span
                    ref={headRef}
                    className="eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={headInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                >
                    Work
                </motion.span>

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
