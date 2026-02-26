import React from 'react';
import './GridDivider.css';

export default function GridDivider() {
    return (
        <section className="grid-divider" aria-hidden="true">
            <div className="gd-top-h" />

            <div className="gd-center-wrap">
                {/* Center Drop */}
                <div className="gd-center-top" />

                {/* Branches */}
                <div className="gd-branch-left" />
                <div className="gd-branch-right" />

                {/* Bottom Drops */}
                <div className="gd-drop gd-drop-left">
                    <Chevrons />
                </div>
                <div className="gd-drop gd-drop-center">
                    <Chevrons />
                </div>
                <div className="gd-drop gd-drop-right">
                    <Chevrons />
                </div>
            </div>
        </section>
    );
}

function Chevrons() {
    return (
        <div className="gd-chevrons">
            {[...Array(3)].map((_, i) => (
                <span key={i} className="gd-chev" style={{ animationDelay: `${i * 0.8}s` }}>V</span>
            ))}
        </div>
    );
}
