import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import LandingZone from './LandingZone';
import RollingParade from './RollingParade';


const Scene = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-0 pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 50 }}
                style={{ width: '100%', height: '100vh' }}
            >
                <Suspense fallback={null}>
                    <Environment preset="studio" />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />

                    <Physics gravity={[0, -9.81, 0]}>

                        {/* Landing Zone (Deep Floor) */}
                        <LandingZone />

                        {/* Rolling Parade */}
                        <RollingParade />
                    </Physics>

                    <OrbitControls enableZoom={false} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Scene;
