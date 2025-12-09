import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { creators } from '../data/creators';
import './TubeText3D.css';

gsap.registerPlugin(ScrollTrigger);



const RollingTitle = ({ text }) => {
    const handleMouseEnter = (e) => {
        const content = e.currentTarget.querySelector('.char-content');
        if (content) {
            content.classList.add('rolling');
        }
    };

    const handleAnimationEnd = (e) => {
        e.target.classList.remove('rolling');
    };

    const charImages = {
        'D': '/images/title_main/D.png',
        'A': '/images/title_main/A.png',
        'E': '/images/title_main/E.png',
        'G': '/images/title_main/G.png',
        'U': '/images/title_main/U.png',
        'L': '/images/title_main/L.png'
    };

    return (
        <span className="inline-block whitespace-nowrap">
            {text.split('').map((char, index) => (
                <span
                    key={index}
                    className="char-wrapper inline-block mx-[0.02em]"
                    onMouseEnter={handleMouseEnter}
                >
                    <span
                        className="char-content inline-block"
                        onAnimationEnd={handleAnimationEnd}
                    >
                        {charImages[char] ? (
                            <img
                                src={charImages[char]}
                                alt={char}
                                className="h-[0.8em] w-auto inline-block object-contain"
                                style={{
                                    verticalAlign: 'middle',
                                    filter: 'brightness(0) saturate(100%) invert(20%) sepia(63%) saturate(5599%) hue-rotate(326deg) brightness(98%) contrast(98%)'
                                }}
                            />
                        ) : (
                            char
                        )}
                    </span>
                </span>
            ))}
        </span>
    );
};

const RollingImageTitle = ({ className = "" }) => {
    const images = [
        { src: '/images/title_main/굴.svg', alt: '굴' },
        { src: '/images/title_main/러.svg', alt: '러' },
        { src: '/images/title_main/다.svg', alt: '다' },
        { src: '/images/title_main/니.svg', alt: '니' },
        { src: '/images/title_main/는.svg', alt: '는' },
        { type: 'space' },
        { src: '/images/title_main/방.svg', alt: '방' },
        { src: '/images/title_main/법.svg', alt: '법' },
    ];

    const items = useMemo(() => {
        return images.map((item) => ({
            ...item,
            randomDuration: 2.0 + Math.random() * 3.0,
            randomDelay: Math.random() * -1,
            randomMargin: 300 + Math.random() * 500, // 300px - 800px random margin
            randomX: (Math.random() - 0.5) * 100, // -50px to 50px
            randomRotate: (Math.random() - 0.5) * 90 // -45deg to 45deg
        }));
    }, []);

    return (
        <div className={`inline-flex items-center ${className}`}>
            {items.map((item, index) => {
                if (item.type === 'space') {
                    return <span key={index} className="w-16"></span>;
                }

                return (
                    <span
                        key={index}
                        className="animate-bounce-continuous inline-block"
                        style={{
                            animationDuration: `${item.randomDuration}s`,
                            animationDelay: `${item.randomDelay}s`,
                            marginRight: `${item.randomMargin}px`,
                            '--bounce-x': `${item.randomX}px`,
                            '--bounce-rotate': `${item.randomRotate}deg`
                        }}
                    >
                        <img
                            src={item.src}
                            alt={item.alt}
                            className="h-16 md:h-20 w-auto object-contain animate-spin-slow"
                        />
                    </span>
                );
            })}
        </div>
    );
};

const TubeText3D = () => {
    const wrapperRef = useRef(null);
    const textWrapperRef = useRef(null);
    const tiltRef = useRef(null);
    const navigate = useNavigate();

    // Updated items with images for student names
    const items = [
        { type: 'image', src: '/images/student_name/김현영.png', name: 'Kim Hyunyoung', alt: '김현영' },
        { type: 'text', content: 'DAEGUL' },
        { type: 'image', src: '/images/student_name/박무아.png', name: 'Park Mua', alt: '박무아' },
        { type: 'text', content: 'DAEGUL' },
        { type: 'image', src: '/images/student_name/박지원.png', name: 'Park Jiwon', alt: '박지원' },
        { type: 'image', src: '/images/student_name/이휘찬.png', name: 'Lee Hwi-chan', alt: '이휘찬', size: 'small' },
        { type: 'text', content: 'DAEGUL' },
        { type: 'image', src: '/images/student_name/정라영.png', name: 'Jeong Ra-young', alt: '정라영', size: 'small' }
    ];

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const textWrapper = textWrapperRef.current;
        const tiltLayer = tiltRef.current;

        if (!wrapper || !textWrapper || !tiltLayer) return;

        // Apply static tilt to the container layer
        gsap.set(tiltLayer, {
            rotationZ: 15, // Tilted clockwise
            rotationX: 10, // Slight tilt forward/back
            transformOrigin: "center center"
        });

        const domItems = gsap.utils.toArray('.tube__text__item', textWrapper);

        const calculatePositions = () => {
            // Radius calculation: 
            // Reduced offset to 0.375 (half of 0.75) as requested
            const offset = 0.375;
            const radius = Math.min(window.innerWidth, window.innerHeight) * offset;
            const spacing = 360 / domItems.length;

            domItems.forEach((item, index) => {
                // Angle in radians
                const angle = (index * spacing * Math.PI) / 180;

                // Position calculation for Tube (Horizontal Cylinder)
                const x = Math.sin(angle) * radius;
                const y = 0;
                const z = Math.cos(angle) * radius;

                // Rotation Y to face outward/inward
                const rotationY = index * spacing;

                gsap.set(item, {
                    x: x,
                    y: y,
                    z: z,
                    rotationY: rotationY,
                    transformOrigin: "center center"
                });
            });
        };

        calculatePositions();

        // Scroll Animation
        const st = ScrollTrigger.create({
            trigger: wrapper,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
            animation: gsap.fromTo(
                textWrapper,
                { rotationY: 0 },
                { rotationY: 360, ease: "none" }
            )
        });

        const handleResize = () => {
            calculatePositions();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            st.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClick = (e) => {
        e.stopPropagation();
        const target = e.currentTarget; // Use currentTarget to get the span/img wrapper

        // Determine text content for search
        let searchText = "";
        if (target.dataset.name) {
            searchText = target.dataset.name;
        } else {
            searchText = target.innerText;
        }

        const creatorsSection = document.getElementById('creators');

        if (!creatorsSection) return;

        // Get current position
        const rect = target.getBoundingClientRect();
        const creatorsRect = creatorsSection.getBoundingClientRect();
        const scrollY = window.scrollY;

        // Clone the element to move it to body (to avoid overflow:hidden of parent)
        const clone = target.cloneNode(true);
        document.body.appendChild(clone);

        // Add click listener to the clone for navigation
        clone.addEventListener('click', (ev) => {
            ev.stopPropagation();
            // Find creator by name (loose match)
            const creator = creators.find(c => c.name.toLowerCase().includes(searchText.toLowerCase()));
            if (creator) {
                navigate(`/creator/${creator.id}`);
            }
        });

        // Ensure pointer events are enabled on the clone
        clone.style.pointerEvents = 'auto';
        clone.style.cursor = 'pointer';

        // Hide original
        target.style.opacity = '0';
        target.style.pointerEvents = 'none';

        // Set initial position for clone
        clone.style.position = 'absolute';
        clone.style.top = `${scrollY + rect.top}px`;
        clone.style.left = `${rect.left}px`;
        clone.style.width = `${rect.width}px`;
        clone.style.height = `${rect.height}px`;
        clone.style.zIndex = '1000';
        clone.style.margin = '0';
        clone.style.transform = 'none';
        clone.style.color = '#333333'; // CHANGED TO DARK GRAY
        clone.style.fontWeight = 'bold';

        // If it's an image, ensure it keeps size and apply filter
        const img = clone.querySelector('img');
        if (img) {
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.filter = 'brightness(0) opacity(0.8)'; // Make falling image dark gray
        }

        // Calculate target position in Creators section
        // Random position within the section width/height
        const sectionTop = scrollY + creatorsRect.top;
        const sectionHeight = creatorsSection.offsetHeight;
        const sectionWidth = creatorsSection.offsetWidth;

        // Target area: Bottom half of creators section
        const targetY = sectionTop + (sectionHeight * 0.5) + (Math.random() * (sectionHeight * 0.4));
        const targetX = (Math.random() * (sectionWidth - 100)) + 50; // Keep within bounds

        // Random rotation
        const randomRotation = (Math.random() - 0.5) * 720;

        // Wander function for continuous rolling
        const wander = () => {
            // Recalculate bounds in case of resize (simplified)
            // Target area: Bottom 60% of creators section to keep them "piled" but moving
            const minY = sectionTop + (sectionHeight * 0.4);
            const maxY = sectionTop + sectionHeight - 50;

            const nextX = (Math.random() * (sectionWidth - 100)) + 50;
            const nextY = minY + (Math.random() * (maxY - minY));

            // Calculate distance for consistent speed
            const currentLeft = parseFloat(clone.style.left);
            const currentTop = parseFloat(clone.style.top);
            const dist = Math.hypot(nextX - currentLeft, nextY - currentTop);
            const speed = 50; // pixels per second (slow roll)
            const duration = Math.max(dist / speed, 2); // Minimum 2 seconds

            gsap.to(clone, {
                left: nextX,
                top: nextY,
                rotationZ: `+=${dist * 0.5 * (Math.random() > 0.5 ? 1 : -1)}`, // Random spin direction based on distance
                rotationX: `+=${Math.random() * 180}`, // Occasional 3D flip
                duration: duration,
                ease: "sine.inOut", // Smooth start/stop
                onComplete: wander
            });
        };

        gsap.to(clone, {
            top: targetY,
            left: targetX,
            rotationZ: `+=${randomRotation}`,
            rotationX: `+=${360}`, // Add some 3D spin
            duration: 1.5,
            ease: "bounce.out",
            onComplete: wander // Start wandering after landing
        });
    };

    return (
        <div className="tube__container">
            <section className="intro__section">
                <div className="relative z-10 w-full animate-fade-in-up text-center">
                    <div className="mb-8 select-none pt-20 flex flex-col gap-4">
                        <h1 className="text-[15vw] md:text-[18vw] leading-[0.8] font-black text-[#333333] tracking-tighter opacity-90">
                            <RollingTitle text="DAEGUL" />
                        </h1>

                        <h1 className="text-[15vw] md:text-[18vw] leading-[0.8] font-black text-[#333333] tracking-tighter opacity-90">
                            <RollingTitle text="DAEGUL" />
                        </h1>
                    </div>
                </div>
                <p className="intro__hint">Scroll down</p>
            </section>

            <section className="tube__wrapper" ref={wrapperRef}>
                <div className="tube__tilt_layer" ref={tiltRef}>
                    <ul className="tube__text__wrapper" ref={textWrapperRef}>
                        {items.map((item, i) => (
                            <li key={i} className="tube__text__item">
                                <span
                                    onClick={handleClick}
                                    data-name={item.name || item.content}
                                    style={{ pointerEvents: 'auto', cursor: 'pointer', display: 'inline-block' }}
                                >
                                    {item.type === 'image' ? (
                                        <img
                                            src={item.src}
                                            alt={item.alt}
                                            className={`${item.size === 'small' ? 'h-12 md:h-16' : 'h-16 md:h-24'} w-auto object-contain`} // Adjusted height based on size prop
                                            style={{
                                                pointerEvents: 'none',
                                                filter: 'brightness(0) opacity(0.8)' // Make images dark gray
                                            }} // Let click pass to span
                                        />
                                    ) : (
                                        item.content
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default TubeText3D;
