import React from 'react';
import './GridDivider.css';

export default function GridDivider() {
    return (
        <section className="grid-divider" aria-hidden="true">
            <div className="gd-center-wrap">
                {/* Branches */}
                {/* Inner Branches: center 50% out to 30% / 70% */}
                <div className="gd-branch gd-branch-inner-left" />
                <div className="gd-branch gd-branch-inner-right" />

                {/* Outer Branches: edges 0% / 100% in to 10% / 90% */}
                <div className="gd-branch gd-branch-outer-left" />
                <div className="gd-branch gd-branch-outer-right" />

                {/* Vertical Drops */}
                <div className="gd-drop gd-drop-outer-left">
                    <Chevrons count={2} />
                </div>

                <div className="gd-drop gd-drop-inner-left">
                    <Chevrons count={3} />
                </div>

                <div className="gd-drop gd-drop-center">
                    <Chevrons count={4} />
                </div>

                <div className="gd-drop gd-drop-inner-right">
                    <Chevrons count={3} />
                </div>

                <div className="gd-drop gd-drop-outer-right">
                    <Chevrons count={2} />
                </div>
            </div>
        </section>
    );
}

function Chevrons({ count = 3 }) {
    return (
        <div className="gd-chevrons">
            {[...Array(count)].map((_, i) => (
                <span key={i} className="gd-chev" style={{ animationDelay: `${i * 0.12}s` }}>V</span>
            ))}
        </div>
    );
}
