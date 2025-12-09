import React, { useRef, useState, useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import { RigidBody, CylinderCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TitleCharacter = ({ textureUrl, position, delay }) => {
    const texture = useTexture(textureUrl);
    const rigidBodyRef = useRef();
    const [start, setStart] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStart(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    useFrame((state) => {
        if (!start || !rigidBodyRef.current) return;

        const body = rigidBodyRef.current;

        // Constant push to the left
        body.applyImpulse({ x: -0.05, y: 0, z: 0 }, true);

        // Random "Tong-tong" bounce (Upward Impulse)
        // Chance to bounce every frame
        if (Math.random() < 0.02) {
            // Random strength for the bounce
            const bounceStrength = 0.5 + Math.random() * 1.0;
            body.applyImpulse({ x: 0, y: bounceStrength, z: 0 }, true);

            // Add a little torque for rotation variety
            body.applyTorqueImpulse({ x: 0, y: 0, z: (Math.random() - 0.5) * 0.1 }, true);
        }

        // Reset position if it goes too far left or falls too low (cleanup/looping logic could go here, 
        // but for now let's just let them fall)
    });

    if (!start) return null;

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            restitution={1.2} // High bounciness
            friction={0.5}
            colliders={false} // Custom collider
            linearDamping={0.1}
            angularDamping={0.1}
        >
            {/* Rotated Cylinder Collider to act as a wheel */}
            <CylinderCollider args={[0.5, 1]} rotation={[0, 0, Math.PI / 2]} />

            {/* Visual Plane */}
            <mesh rotation={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
            </mesh>
        </RigidBody>
    );
};

const TitleParade = () => {
    const characters = [
        { url: '/images/title_main/굴.png', delay: 0 },
        { url: '/images/title_main/러.png', delay: 2 },
        { url: '/images/title_main/다.png', delay: 4 },
        { url: '/images/title_main/니.png', delay: 6 },
        { url: '/images/title_main/는.png', delay: 8 },
        { url: '/images/title_main/방.png', delay: 10 },
        { url: '/images/title_main/법.png', delay: 12 },
    ];

    return (
        <group>
            {characters.map((char, index) => (
                <TitleCharacter
                    key={index}
                    textureUrl={char.url}
                    position={[15, 5, 0]} // Spawn from right, slightly up
                    delay={char.delay}
                />
            ))}
        </group>
    );
};

export default TitleParade;
