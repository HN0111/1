import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const LandingZone = () => {
    const floorY = -2.5;
    const wallHeight = 100; // Tall enough to catch objects falling from top
    const wallThickness = 2;
    const roomWidth = 50; // Wider to cover 5 columns
    const roomDepth = 15; // Depth can remain similar

    return (
        <group position={[0, floorY, 0]}>
            {/* Floor */}
            <RigidBody type="fixed" friction={1} restitution={0.2}>
                <CuboidCollider args={[roomWidth, 1, roomDepth]} position={[0, -1, 0]} />
            </RigidBody>

            {/* Walls (Invisible) */}
            {/* Walls (Invisible) - REMOVED to allow falling */}
            {/* <RigidBody type="fixed" friction={0}>
                <CuboidCollider args={[wallThickness, wallHeight, roomDepth]} position={[-roomWidth - wallThickness, wallHeight / 2, 0]} />
                <CuboidCollider args={[wallThickness, wallHeight, roomDepth]} position={[roomWidth + wallThickness, wallHeight / 2, 0]} />
                <CuboidCollider args={[roomWidth, wallHeight, wallThickness]} position={[0, wallHeight / 2, -roomDepth - wallThickness]} />
                <CuboidCollider args={[roomWidth, wallHeight, wallThickness]} position={[0, wallHeight / 2, roomDepth + wallThickness]} />
            </RigidBody> */}
        </group>
    );
};

export default LandingZone;
