import React from 'react';
import './LeeHwichan.css';

const LeeHwichanPage = ({ creator }) => {
    const filmStripImages = [
        '/assets/lee_hwichan/1.png',
        '/assets/lee_hwichan/2.png',
        '/assets/lee_hwichan/3.png',
        '/assets/lee_hwichan/4.png'
    ];

    const displayImages = [...filmStripImages, ...filmStripImages, ...filmStripImages, ...filmStripImages];

    return (
        <div className="lee-hwichan-container">
            {/* Left Film Strip */}
            <div className="film-strip-section">
                <div className="film-strip-track">
                    {displayImages.map((img, index) => (
                        <div key={index} className="film-frame">
                            <img src={img} alt={`Work detail ${index}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Content Area */}
            <div className="content-section">
                {/* Header Row: Names (Left) and Meta (Right) */}
                <div className="header-row">
                    <div className="names-wrapper">
                        <div className="student-name-kr">{creator.koreanName}</div>
                        <div className="student-name-en">LEE HWI CHAN</div>
                    </div>

                    <div className="meta-wrapper">
                        <span className="meta-info-text">
                            {creator.title}, {creator.materials}
                        </span>
                    </div>
                </div>

                {/* Description Row: Korean (Left) and English (Right) */}
                <div className="description-row">
                    <div className="desc-col-left">
                        <div className="work-description-kr">
                            {creator.description}
                        </div>
                    </div>

                    <div className="desc-col-right">
                        <div className="work-description-en">
                            Throughout the course of a single day, countless moments pass by us. Within these passing fragments, each of us observes the world through our own lens, and these perspectives collectively construct the world that surrounds us. At times we stand as distant observers; at other times we find ourselves deeply embedded within it. And then, without warning, a question arises: Where am I standing now? At what point have I arrived that even the legs supporting me seem to disappear from view? As I continue to look, I am drawn toward an unfamiliar point of awareness. This work begins with the act of ‘observation’—the fundamental way we confront the world. Beyond merely recognizing an object, we continuously define the relationship between what we see and the self that sees, assigning meaning in our own terms. Within the virtual space, viewers wander through the environment, exploring and reconstructing the images, sounds, and spatial cues through the perspective of their own gaze. A simple question—What am I looking at right now?—unfolds into deeper reflections on the boundary between the observing self and the observed world, and ultimately on the meaning of one’s own existence standing within an unfamiliar realm.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeeHwichanPage;
