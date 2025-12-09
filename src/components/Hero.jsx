import React from 'react';
import ScrollIndicator from './ScrollIndicator';
const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
            {/* Scene moved to App.jsx */}
            <div className="relative z-10 max-w-4xl animate-fade-in-up">
                <p className="text-lg md:text-xl text-gray-400 mb-4 tracking-widest uppercase">
                    DAEGUL DAEGUL
                </p>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                    굴러다니는 방법<br />
                    <span className="text-primary">2025 ART&INNOVATION</span>
                </h1>
                <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    2025년 12월 23일(화) ~ 12월 28일(일)<br />
                    대구문화예술회관 12전시실
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a href="#creators" className="uiverse-button">
                        View Creators
                    </a>
                    <a href="#visit" className="uiverse-button">
                        Visit Exhibition
                    </a>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in delay-1000">
                <ScrollIndicator />
            </div>
        </section>
    );
};

export default Hero;
