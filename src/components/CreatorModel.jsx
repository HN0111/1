import React, { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, Center, OrbitControls } from '@react-three/drei';

const Model = ({ url }) => {
    const { scene } = useGLTF(url);

    return (
        <Center>
            <primitive
                object={scene}
                scale={2}
            />
        </Center>
    );
};

const CreatorModel = ({ modelPath }) => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    <Model url={modelPath} />
                    <Environment preset="city" />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 2}
                        maxPolarAngle={Math.PI / 2}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default CreatorModel;
