import React from 'react';
import './ParkJiwon.css';

const ParkJiwonPage = ({ creator }) => {
    return (
        <div className="park-jiwon-container">
            {/* Background Image */}
            <div className="pj-background">
                <img src="/assets/park_jiwon/박지원 배경이미지.jpg" alt="Background" />
            </div>

            {/* Content Overlay */}
            <div className="pj-title-group">
                <div className="pj-name-kr">{creator.koreanName}</div>
                <div className="pj-name-en">{creator.name.split('(')[1].replace(')', '')}</div>
            </div>

            <div className="pj-content-overlay">
                <div className="pj-description">
                    {creator.description}
                    <span className="pj-work-info">
                        &nbsp;&nbsp;&nbsp;
                        <span className="pj-work-title">{creator.title}</span>
                        <span className="pj-materials"> {creator.materials}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ParkJiwonPage;
