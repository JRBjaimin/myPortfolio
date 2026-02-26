import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './AnimatedDivider.css';

export default function AnimatedDivider() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 85%", "end 50%"]
    });

    // Draw horizontal branches first, then vertical drops
    const scrollX = useTransform(scrollYProgress, [0, 0.45], [0, 1]);
    const scrollY = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

    return (
        <section className="anim-divider" ref={ref} aria-hidden="true">
            <div className="ad-center-wrap">
                {/* Horizontal Branches branching from center */}
                <motion.div className="ad-branch-left" style={{ scaleX: scrollX, transformOrigin: 'right' }} />
                <motion.div className="ad-branch-right" style={{ scaleX: scrollX, transformOrigin: 'left' }} />

                {/* Vertical Drops going downwards */}
                <motion.div className="ad-drop ad-drop-left" style={{ scaleY: scrollY, transformOrigin: 'top' }}>
                    <Chevrons />
                </motion.div>
                <motion.div className="ad-drop ad-drop-center" style={{ scaleY: scrollY, transformOrigin: 'top' }}>
                    <Chevrons />
                </motion.div>
                <motion.div className="ad-drop ad-drop-right" style={{ scaleY: scrollY, transformOrigin: 'top' }}>
                    <Chevrons />
                </motion.div>
            </div>
        </section>
    );
}

function Chevrons() {
    return (
        <div className="ad-chevrons">
            {[...Array(3)].map((_, i) => (
                <span key={i} className="ad-chev" style={{ animationDelay: `${i * 0.8}s` }}>V</span>
            ))}
        </div>
    );
}
