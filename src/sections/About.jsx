import React from 'react';
import './About.css';
import { FadeUp, ClipReveal, StaggerList, staggerItem, LineDraw } from '../animations';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section id="about" className="about">
            <LineDraw />
            <div className="container about__inner">
                <FadeUp>
                    <span className="eyebrow">About</span>
                </FadeUp>

                {/* Clip-mask reveal for the headline — mindjoin style */}
                <h2 className="section-title about__headline">
                    <ClipReveal delay={0.05}>Building apps that</ClipReveal>
                    <ClipReveal delay={0.15}><em>move with purpose.</em></ClipReveal>
                </h2>

                <FadeUp delay={0.2}>
                    <p className="section-body">
                        Senior Mobile Application Developer with <strong>6+ years of experience</strong> designing
                        and delivering scalable cross-platform mobile applications using React Native (CLI &amp; Expo)
                        and Flutter. I've built <strong>15+ apps</strong> across sports, fintech, IoT, social networking,
                        and emergency communication — each one crafted with clean architecture, real-world performance,
                        and user experience in mind.
                    </p>
                    <p className="section-body about__body2">
                        Based in <span className="text-gold">Surat, India.</span>
                    </p>
                </FadeUp>

                {/* Stats — stagger in */}
                <StaggerList className="about__stats">
                    {[
                        { value: '6+', label: 'Years Experience' },
                        { value: '15+', label: 'Apps Shipped' },
                        // { value: '3', label: 'Companies' },
                    ].map(s => (
                        <motion.div key={s.label} className="about__stat" variants={staggerItem}>
                            <span className="about__stat-value">{s.value}</span>
                            <span className="about__stat-label">{s.label}</span>
                        </motion.div>
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
