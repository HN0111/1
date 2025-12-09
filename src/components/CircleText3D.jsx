import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './CircleText3D.css';

gsap.registerPlugin(ScrollTrigger);

const CircleText3D = () => {
    const wrapperRef = useRef(null);
    const leftWrapperRef = useRef(null);
    const rightWrapperRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const leftWrapper = leftWrapperRef.current;
        const rightWrapper = rightWrapperRef.current;

        if (!wrapper || !leftWrapper || !rightWrapper) return;

        // Configuration objects
        const leftConfig = {
            wrapper: leftWrapper,
            items: gsap.utils.toArray('.circle__text__left__item', leftWrapper),
            radius: 0,
            direction: 1,
            centerX: 0,
            centerY: 0
        };

        const rightConfig = {
            wrapper: rightWrapper,
            items: gsap.utils.toArray('.circle__text__right__item', rightWrapper),
            radius: 0,
            direction: -1,
            centerX: 0,
            centerY: 0
        };

        const updateDimensions = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;

            // Radius: Slightly smaller than half width to avoid edge clipping
            const r = w * 0.4;
            leftConfig.radius = r;
            rightConfig.radius = r;

            // Calculate Center X relative to each wrapper to center the circle on screen
            // Left Wrapper is at left: 30%, translateX(-100%) -> Visual Left = -0.7w
            // We want circle center at 0.5w. 
            // So x inside wrapper = 0.5w - (-0.7w) = 1.2w
            leftConfig.centerX = 1.2 * w;
            leftConfig.centerY = h / 2;

            // Right Wrapper is at left: 70% -> Visual Left = 0.7w
            // We want circle center at 0.5w.
            // So x inside wrapper = 0.5w - 0.7w = -0.2w
            rightConfig.centerX = -0.2 * w;
            rightConfig.centerY = h / 2;
        };

        const updateItemsPosition = (config, scrollY) => {
            const { items, radius, direction, centerX, centerY } = config;
            const totalItems = items.length;
            const spacing = Math.PI / totalItems;

            items.forEach((item, index) => {
                const angle = index * spacing - scrollY * direction * Math.PI * 2;

                // Calculate position relative to the wrapper's origin
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;

                // Rotation correction:
                // The text needs to be perpendicular to the radius.
                // Based on Codrops article: const rotation = (angle * 180) / Math.PI + rotationOffset;
                // But we need to adjust it to make it tangent.
                // Adding -90 degrees makes the text tangent to the circle.

                const rotationOffset = direction === -1 ? 180 : 0;
                const rotation = (angle * 180) / Math.PI - 90 + rotationOffset;

                gsap.set(item, {
                    x: x,
                    y: y,
                    rotation: rotation,
                    transformOrigin: "center center",
                });
            });
        };

        const init = () => {
            updateDimensions();
            updateItemsPosition(leftConfig, 0);
            updateItemsPosition(rightConfig, 0);
        };

        init();

        // Scroll Animation
        const st = ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                const scrollY = self.progress * 0.5;
                updateItemsPosition(leftConfig, scrollY);
                updateItemsPosition(rightConfig, scrollY);
            }
        });

        const handleResize = () => {
            updateDimensions();
            const progress = st.progress * 0.5;
            updateItemsPosition(leftConfig, progress);
            updateItemsPosition(rightConfig, progress);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            st.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Generate dummy text items
    const items = Array.from({ length: 48 }, (_, i) => `DAEGUL`);

    return (
        <div className="circle__container">
            <section className="intro__section">
                <h1 className="intro__title">
                    Circle Text<br />
                    Scroll Animation
                </h1>
                <p className="intro__hint">Scroll down</p>
            </section>

            <section className="circle__wrapper" ref={wrapperRef}>
                <ul className="circle__text__wrapper__left" ref={leftWrapperRef}>
                    {items.map((text, i) => (
                        <li key={i} className="circle__text__left__item">{text}</li>
                    ))}
                </ul>
                <ul className="circle__text__wrapper__right" ref={rightWrapperRef}>
                    {items.map((text, i) => (
                        <li key={i} className="circle__text__right__item">{text}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default CircleText3D;
