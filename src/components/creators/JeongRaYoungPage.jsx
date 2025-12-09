import React from 'react';
import './JeongRaYoung.css';

const JeongRaYoungPage = ({ creator }) => {
    return (
        <div className="jeong-ra-young-container">
            <div className="bg-container">
                {/* Restore the Name Title Group */}
                <div className="jry-title-group">
                    <div className="jry-name-kr">{creator.koreanName}</div>
                    <div className="jry-name-en">JEONG RA YOUNG</div>
                </div>

                <main className="content-column">

                    <div className="text-block">
                        <p className="kor">
                            빨간 사과 껍질은 거울에 비친 나로, 우리는 거울을 볼 때 나라고 생각하지만 그것은 내가 아닌 나의 이미지일 뿐이다. 변질된 내용물이 박제된 사과의 모습은 어떠한 ’이미지’로 고정되었다. 우리는 사과의 표면인 빨간색의 존재로 자신을 받아들이려 하며 이것은 타인에게 보여주고 싶어 하는 꾸며진 자아이다_타인에게 보이는 ‘나’는 껍데기일 뿐이라는 은유로 보이기도 한다. 우리는 껍질_이미지만 보고 그것을 사과라고 부르며 그 껍질을 지탱하고 의미를 부여하는 씨앗과 과즙, 과육은 모든 이미지와 언어가 생성되기 이전_사회가 규정하기 이전_의 가장 원초적인 인간의 본질에 해당한다. 사과 껍질 아래에 단어들을 배치하고 정렬한 행위는 인간이 사회 속에서 어떻게 규정되는지를 보여주며 박제된 껍질은 자아이자 페르소나로서 사과의 내용물을 보호하는 듯하지만 외부의 시선이 닿는 유일한 면이기도 하다. 배열된 사과 껍질과 이를 의미하는 각 단어들을 구성하는 선반, 그리고 분리된 과육, 씨앗, 과즙이 위치한 좌대는 어떻게 본질을 소외시키면서 동시에 구성하는지 상기시킨다.
                        </p>

                        <p className="eng">
                            Red apple peels act as a mirror to the self. We mistake the reflection in the mirror for our true selves, but it is, in fact, nothing more than an image. The preserved apple is fixed as a static image, and while we try to accept our existence through its red surface, this is merely a curated persona designed for others—a metaphor for how the 'me' seen by the world is just a shell. We see the peel and call it an 'apple,' yet the seeds, juice, and flesh that once gave it substance represent a primordial human essence that exists prior to all images, language, and societal definitions. Arranging words beneath the peels reveals how we are defined by society. The preserved peel, acting as both self and persona, seems to protect what lies within, yet it is the only surface exposed to the outside world. The contrast between the shelves displaying the peels and words, and the pedestals holding the separated flesh and seeds, confronts us with how essence is simultaneously alienated and constructed.
                        </p>
                    </div>

                    <div className="image-block">
                        <img src="/assets/jeong_ra_young/work.jpg" alt="Desire" />
                    </div>

                </main>
            </div>
        </div>
    );
};

export default JeongRaYoungPage;
