import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { creators } from '../data/creators';
import LeeHwichanPage from './creators/LeeHwichanPage';
import ParkMuaPage from './creators/ParkMuaPage';
import ParkJiwonPage from './creators/ParkJiwonPage';
import JeongRaYoungPage from './creators/JeongRaYoungPage';
import KimHyunyoungPage from './creators/KimHyunyoungPage';

const CreatorDetail = () => {
    const { id } = useParams();
    const creator = creators.find(c => c.id === parseInt(id));

    if (!creator) {
        return <div className="text-white text-center mt-20">Creator not found</div>;
    }

    // Custom Page Routing
    if (creator.id === 4) {
        return <LeeHwichanPage creator={creator} />;
    }
    if (creator.id === 2) {
        return <ParkMuaPage creator={creator} />;
    }
    if (creator.id === 3) {
        return <ParkJiwonPage creator={creator} />;
    }
    if (creator.id === 5) {
        return <JeongRaYoungPage creator={creator} />;
    }
    if (creator.id === 1) {
        return <KimHyunyoungPage creator={creator} />;
    }

    // Default Layout for other creators
    return (
        <div className="min-h-screen bg-black text-white pt-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <Link to="/" className="text-gray-400 hover:text-white mb-8 inline-block">
                    &larr; Back to Home
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <img
                            src={creator.image}
                            alt={creator.name}
                            className="w-full h-auto rounded-lg shadow-lg mb-6"
                        />
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold mb-2">{creator.koreanName}</h1>
                        <h2 className="text-xl text-gray-400 mb-6">{creator.name}</h2>

                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-2">{creator.title}</h3>
                            <p className="text-gray-400 italic">{creator.materials}</p>
                        </div>

                        <div className="prose prose-invert max-w-none">
                            <p className="whitespace-pre-wrap leading-relaxed">
                                {creator.description}
                            </p>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-800">
                            {creator.email && <p className="text-gray-400">Email: {creator.email}</p>}
                            {creator.instagram && <p className="text-gray-400">Instagram: {creator.instagram}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatorDetail;
