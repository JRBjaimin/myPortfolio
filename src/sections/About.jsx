import React from 'react';
import './About.css';
import { FadeUp, ClipReveal, StaggerList, staggerItem, LineDraw } from '../animations';
import { motion as Motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ABOUT_LINES = [
    'Senior Mobile Application Developer with 6+ years of experience designing and delivering scalable cross-platform mobile applications using React Native (CLI & Expo) and Flutter.',
    "I've built 15+ apps across sports, fintech, IoT, social networking, and emergency communication — each one crafted with clean architecture, real-world performance, and user experience in mind.",
];

export default function About() {
    const headlineRef = useRef(null);
    const headlineInView = useInView(headlineRef, { margin: '-12% 0px -22% 0px', once: false });

    return (
        <section id="about" className="about">
            <LineDraw />
            <div className="container about__inner">
                <FadeUp>
                    <span className="eyebrow">About</span>
                </FadeUp>

                <h2 ref={headlineRef} className="section-title about__headline">
                    <span className="about__headline-row about__headline-row--split">
                        <Motion.span
                            className="about__headline-part about__headline-part--left"
                            initial={{ x: -120, opacity: 0 }}
                            animate={headlineInView ? { x: 0, opacity: 1 } : { x: -120, opacity: 0 }}
                            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                        >
                            Building
                        </Motion.span>
                        <Motion.span
                            className="about__headline-part about__headline-part--right"
                            initial={{ x: 120, opacity: 0 }}
                            animate={headlineInView ? { x: 0, opacity: 1 } : { x: 120, opacity: 0 }}
                            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                        >
                            apps that
                        </Motion.span>
                    </span>
                    <span className="about__headline-row">
                        <ClipReveal delay={0.12}><em>move with purpose.</em></ClipReveal>
                    </span>
                </h2>

                <div className="about__copy-reveal">
                    {ABOUT_LINES.map((line, index) => (
                        <div key={line} className="about__line-wrap">
                            <ClipReveal delay={0.22 + index * 0.1}>
                                <p className="section-body about__line">{line}</p>
                            </ClipReveal>
                        </div>
                    ))}
                    <div className="about__line-wrap about__line-wrap--location">
                        <ClipReveal delay={0.44}>
                            <p className="section-body about__body2">
                                Based in <span className="text-gold">Surat, India.</span>
                            </p>
                        </ClipReveal>
                    </div>
                </div>

                {/* Stats — stagger in */}
                <StaggerList className="about__stats">
                    {[
                        { value: '6+', label: 'Years Experience' },
                        { value: '15+', label: 'Apps Shipped' },
                        // { value: '3', label: 'Companies' },
                    ].map(s => (
                        <Motion.div key={s.label} className="about__stat" variants={staggerItem}>
                            <span className="about__stat-value">{s.value}</span>
                            <span className="about__stat-label">{s.label}</span>
                        </Motion.div>
                    ))}
                </StaggerList>

                {/* Education — fade up */}
                <FadeUp delay={0.1}>
                    <div className="about__edu">
                        <span className="eyebrow">Education</span>
                        {[
                            { degree: 'MCA', detail: 'Master of Computer Applications' },
                            { degree: 'BCA', detail: 'Bachelor of Computer Applications' },
                        ].map(e => (
                            <div key={e.degree} className="about__edu-row">
                                <span className="about__edu-deg">{e.degree}</span>
                                <span className="about__edu-detail">{e.detail}</span>
                            </div>
                        ))}
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
