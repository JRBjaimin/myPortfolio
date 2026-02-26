import React from 'react';
import './Experience.css';
import { FadeUp, ClipReveal, LineDraw } from '../animations';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const JOBS = [
    {
        company: 'Crest Infosystems',
        role: 'Senior Software Developer',
        duration: 'March 2022 – Present',
        points: [
            'Developed 5+ scalable cross-platform apps using React Native and Flutter',
            'Built FootballU sports coaching platform, improving play-creation efficiency by 5×',
            'Designed reusable component library reducing development time by 30%',
            'Integrated Stripe subscriptions, Supabase backend, and RESTful APIs',
            'Optimized app performance resulting in 40% faster load times',
            'Implemented authentication, secure storage, and push notifications',
            'Published and maintained apps on Google Play Store',
            'Worked in Agile/Scrum environment',
        ],
    },
    {
        company: 'Intuz Solutions',
        role: 'React Native Developer',
        duration: 'July 2021 – February 2022',
        points: [
            'Developed UI modules for social networking and IoT applications',
            'Created 20+ reusable components using TypeScript and Storybook',
            'Improved UI responsiveness by 25%',
        ],
    },
    {
        company: 'I-Pangram Digital Services LLP',
        role: 'React Native Developer',
        duration: 'October 2019 – June 2021',
        points: [
            'Built crypto investment and meditation apps with multi-language support',
            'Implemented Text-to-Speech (TTS) and in-app purchases',
            'Reduced crash rate by 30% through bug fixes and optimization',
        ],
    },
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

function JobCard({ job, index }) {
    const ref = useRef(null);
    const inView = useBidirectional(ref);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
        >
            <div className="exp__card">
                <div className="exp__card-meta">
                    <div>
                        <h3 className="exp__company">{job.company}</h3>
                        <p className="exp__role">{job.role}</p>
                    </div>
                    <span className="exp__duration">{job.duration}</span>
                </div>
                <ul className="exp__points">
                    {job.points.map(pt => <li key={pt}>{pt}</li>)}
                </ul>
            </div>
        </motion.div>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="exp">
            <LineDraw />
            <div className="container exp__inner">
                <FadeUp><span className="eyebrow">Career</span></FadeUp>
                <h2 className="section-title">
                    <ClipReveal delay={0.05}>Experience</ClipReveal>
                </h2>
                <div className="exp__list">
                    {JOBS.map((job, i) => (
                        <JobCard key={job.company} job={job} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
