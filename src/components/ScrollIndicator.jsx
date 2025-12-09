import React from 'react';
import './ScrollIndicator.css';

const ScrollIndicator = () => {
    return (
        <a href="#about" className="main__scroll">
            <div className="main__scroll-box"></div>
            <span className="main__scroll-text">Scroll</span>
        </a>
    );
};

export default ScrollIndicator;
