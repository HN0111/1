import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { RigidBody, useRapier } from '@react-three/rapier';

import * as THREE from 'three';

const StudentObject = ({ url, position, rotation, scale = 1, id, navigate, speed = 1 }) => {
    const { scene } = useGLTF(url);
    const rigidBodyRef = useRef();
    // const navigate = useNavigate(); // Removed: Context not available in Canvas

    // State Machine: 'floating' | 'falling' | 'landed'
    const [status, setStatus] = useState('floating');
    const [hovered, setHovered] = useState(false);

    // Clone scene to avoid sharing instances
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // Random floating parameters
    const floatOffset = useRef(Math.random() * 100);
    const floatSpeed = useRef((0.5 + Math.random() * 0.5) * speed);

    useEffect(() => {
        if (rigidBodyRef.current) {
            // Wake up the body
            rigidBodyRef.current.wakeUp();

            // Randomize position slightly to prevent stacking
            const randomOffset = new THREE.Vector3(
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5,
                (Math.random() - 0.5) * 0.5
            );
            const initialPos = new THREE.Vector3(...position).add(randomOffset);

            rigidBodyRef.current.setTranslation(initialPos, true);
            rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
        }
    }, [position]);

    useFrame((state, delta) => {
        if (!rigidBodyRef.current) return;

        if (status === 'floating') {
            const time = state.clock.getElapsedTime();
            const floatY = Math.sin(time * floatSpeed.current + floatOffset.current) * 0.02;

            // Antigravity: Apply velocity to maintain float
            rigidBodyRef.current.setLinvel({
                x: 0,
                y: floatY * 50, // Stronger float force to counteract gravity
                z: 0
            }, true);

            // Gentle rotation
            // Gentle rotation
            rigidBodyRef.current.setAngvel({
                x: Math.sin(time * 0.5 * speed) * 0.2,
                y: 0.5 * speed,
                z: Math.cos(time * 0.5 * speed) * 0.2
            }, true);
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();

        if (status === 'floating') {
            setStatus('falling');
            if (rigidBodyRef.current) {
                rigidBodyRef.current.wakeUp();
                // Initial push downwards
                rigidBodyRef.current.applyImpulse({
                    x: (Math.random() - 0.5) * 2,
                    y: -5, // Push down
                    z: (Math.random() - 0.5) * 2
                }, true);

                rigidBodyRef.current.applyTorqueImpulse({
                    x: (Math.random() - 0.5) * 1,
                    y: (Math.random() - 0.5) * 1,
                    z: (Math.random() - 0.5) * 1
                }, true);
            }
        } else if (status === 'falling' || status === 'landed') {
            // Navigate on second click
            navigate(`/creator/${id}`);
        }
    };

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            rotation={rotation}
            colliders="hull" // Use hull for accurate collision
            restitution={0.5} // Bounciness
            friction={0.5}
            linearDamping={0.5}
            angularDamping={0.5}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <primitive
                object={clonedScene}
                scale={scale}
            />
        </RigidBody>
    );
};

export default StudentObject;
