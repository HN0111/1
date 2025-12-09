import React from 'react';

const Footer = () => {
    return (
        <footer id="visit" className="py-20 bg-transparent text-[#333333] pointer-events-none relative z-10">
            {/* Hidden anchor for Contact link */}
            <div id="contact" className="absolute top-0 left-0" />

            <div className="container mx-auto px-6 pointer-events-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                    {/* Column 1: Basic Info */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold mb-1">전시 기간</h3>
                            <p className="text-sm">2025년 12월 23일(화) ~ 12월 28일(일)</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">관람 시간</h3>
                            <p className="text-sm">10:00 - 18:00</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">입장료</h3>
                            <p className="text-sm">무료</p>
                        </div>
                    </div>

                    {/* Column 2: Location */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold mb-1">위치</h3>
                            <p className="text-sm">대구문화예술회관 12전시실<br />대구광역시 달서구 공원순환로 201</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">대중교통</h3>
                            <p className="text-sm">지하철 1호선 중앙로역 하차</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">주차</h3>
                            <p className="text-sm">회관 주차장 이용 가능</p>
                        </div>
                    </div>

                    {/* Column 3: Inquiry */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold mb-1">문의</h3>
                            <p className="text-sm">
                                artinnovation24@gmail.com
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">홍보 담당</h3>
                            <p className="text-sm">정라영</p>
                        </div>
                    </div>

                    {/* Column 4: Exhibition Info */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold mb-1">전시 정보</h3>
                            <p className="text-sm leading-relaxed">
                                아트&이노베이션 展<br />
                                굴러다니는 방법
                            </p>
                        </div>
                    </div>

                    {/* Column 5: Organizer */}
                    <div className="space-y-4">

                        <div>
                            <h3 className="font-bold mb-1">주최</h3>
                            <p className="text-sm">
                                대구예술대학교<br />
                                아트&이노베이션 전공
                            </p>
                        </div>
                        <div className="pt-8">
                            <p className="text-xs opacity-70">
                                &copy; 2025 ART&INNOVATION.<br />All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
