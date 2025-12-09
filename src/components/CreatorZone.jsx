import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const CreatorZone = () => {
    // Define the bounds of the creator zone
    // Assuming the floor is at y = -5, and we want a box around it
    // Width: 20, Depth: 10, Height: 10 (walls)

    return (
        <group position={[0, -5, 0]}>
            {/* Floor */}
            <RigidBody type="fixed" restitution={0.2} friction={1}>
                <CuboidCollider args={[20, 0.5, 20]} position={[0, -0.5, 0]} />
            </RigidBody>

            {/* Invisible Walls */}
            <RigidBody type="fixed">
                {/* Back Wall */}
                <CuboidCollider args={[20, 5, 0.5]} position={[0, 5, -5]} />
                {/* Front Wall (Invisible barrier to keep them from falling off screen) */}
                <CuboidCollider args={[20, 5, 0.5]} position={[0, 5, 5]} />
                {/* Left Wall */}
                <CuboidCollider args={[0.5, 5, 10]} position={[-10, 5, 0]} />
                {/* Right Wall */}
                <CuboidCollider args={[0.5, 5, 10]} position={[10, 5, 0]} />
            </RigidBody>
        </group>
    );
};

export default CreatorZone;
