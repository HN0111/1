import React, { useEffect, useState } from 'react';
import './ParkMua.css';

const ParkMuaPage = ({ creator }) => {
    // Layout adjustments based on pamphlet reference:
    // Text is on the left column.
    // Main artwork is on the right, tilted.
    // Images are scattered in specific zones.

    const scatteredImages = [
        // 1. Top Left - Dark jagged shape (Assumed 6.png based on previous look)
        { src: '/assets/park_mua/6.png', top: '10%', left: '10%', width: '180px', z: 50, rotateX: 10, rotateY: 10, rotateZ: -15 },

        // 2. Middle Left - Purple/Grey shape (Assumed 0.png or similar)
        { src: '/assets/park_mua/0.png', top: '35%', left: '2%', width: '140px', z: 80, rotateX: 0, rotateY: 20, rotateZ: 10 },

        // 3. Bottom Left - Large complex shape (Assumed 1.png)
        { src: '/assets/park_mua/1.png', top: '65%', left: '5%', width: '220px', z: 100, rotateX: 10, rotateY: -10, rotateZ: -5 },

        // 4. Top Center - Brown/Gold shape (Assumed 2.png)
        { src: '/assets/park_mua/2.png', top: '5%', left: '35%', width: '130px', z: -20, rotateX: 20, rotateY: 0, rotateZ: 30 },

        // 5. Bottom Center - Blue shape (Assumed 8.png)
        { src: '/assets/park_mua/8.png', top: '85%', left: '40%', width: '120px', z: 60, rotateX: -10, rotateY: 0, rotateZ: 0 },

        // 6. Right Side / Overlapping - Green stick/line (Assumed 7.png)
        { src: '/assets/park_mua/7.png', top: '50%', left: '90%', width: '15px', height: '300px', z: 20, rotateX: 0, rotateY: 0, rotateZ: 15 },
        // Note: If 7.png is not a stick, this might look weird. Reverting to normal width if it's a shape.
        // Let's assume standard shape for now but positioned right.

        // 7. Top Right - Yellow/Green shape (Assumed 3.png)
        { src: '/assets/park_mua/3.png', top: '10%', left: '70%', width: '140px', z: -50, rotateX: 0, rotateY: 10, rotateZ: -20 },

        // 8. Bottom Right - Another shape (Assumed 4.png)
        { src: '/assets/park_mua/4.png', top: '80%', left: '80%', width: '150px', z: 40, rotateX: 10, rotateY: -20, rotateZ: 10 },

        // 9. Extra filler (Assumed 5.png)
        { src: '/assets/park_mua/5.png', top: '20%', left: '50%', width: '100px', z: -80, rotateX: 0, rotateY: 0, rotateZ: 45 },

        // 10. Extra filler (Assumed 9.png)
        { src: '/assets/park_mua/9.png', top: '60%', left: '25%', width: '110px', z: -10, rotateX: 5, rotateY: 5, rotateZ: -10 },
    ];

    return (
        <div className="park-mua-container">
            <div className="pm-3d-scene">
                {/* Main Artwork - Tilted Plane on Right */}
                <div
                    className="main-artwork"
                    style={{
                        transform: `
                            translateZ(-100px) 
                            rotateY(-25deg) 
                            rotateX(0deg)
                        `
                    }}
                >
                    <img src="/assets/park_mua/박무아 배경이미지.jpg" alt="Main Artwork" />
                </div>

                {/* Scattered Fragments */}
                {scatteredImages.map((img, index) => (
                    <div
                        key={index}
                        className="scatter-item"
                        style={{
                            top: img.top,
                            left: img.left,
                            width: img.width,
                            height: img.height || 'auto',
                            transform: `
                                translateZ(${img.z}px) 
                                rotateX(${img.rotateX}deg) 
                                rotateY(${img.rotateY}deg) 
                                rotateZ(${img.rotateZ}deg)
                            `
                        }}
                    >
                        <img src={img.src} alt={`Fragment ${index}`} />
                    </div>
                ))}
            </div>

            {/* Text Content - Left Side */}
            <div className="pm-content-overlay">
                <div className="pm-title-group">
                    <div className="pm-name-kr">{creator.koreanName}</div>
                    <div className="pm-name-en">PARK MUA</div>
                </div>

                <div className="pm-description">
                    {creator.description}
                </div>

                <div className="pm-work-info">
                    <p>{creator.title}</p>
                    <p>{creator.materials}</p>
                </div>
            </div>
        </div>
    );
};

export default ParkMuaPage;
