import React from 'react';
import './KimHyunyoung.css';

const KimHyunyoungPage = ({ creator }) => {
    return (
        <div className="khy-container">
            <div className="khy-bg-image">
                <img
                    src="/assets/kim_hyunyoung/김현영 테두리 이미지.png"
                    alt="Kim Hyunyoung Main"
                />
            </div>

            <div className="khy-center-image">
                <img
                    src="/assets/kim_hyunyoung/김현영 테두리 위에서 정중앙에 위치하는 이미지.png"
                    alt="Kim Hyunyoung Center"
                />
            </div>

            <div className="khy-content">
                <div className="khy-title-group">
                    <div className="khy-name-kr">{creator.koreanName}</div>
                    <div className="khy-name-en">{creator.name.split(' (')[1].replace(')', '')}</div>
                </div>

                <div className="khy-description-block">
                    <p className="whitespace-pre-wrap">
                        {creator.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KimHyunyoungPage;
