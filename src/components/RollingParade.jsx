import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTexture, useGLTF } from '@react-three/drei';
import { RigidBody, CylinderCollider } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TitleCharacter = ({ textureUrl, position, delay, targetPosition, isName = false }) => {
    const texture = useTexture(textureUrl);
    const rigidBodyRef = useRef();
    const [start, setStart] = useState(false);
    const [isAligning, setIsAligning] = useState(false);
    const timeRef = useRef(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setStart(true);
        }, delay * 1000);
        return () => clearTimeout(timeout);
    }, [delay]);

    useFrame((state, delta) => {
        if (!start || !rigidBodyRef.current) return;

        const body = rigidBodyRef.current;
        const translation = body.translation();

        timeRef.current += delta;

        // Start aligning 5 seconds after spawning (adjust as needed)
        // Only for title characters (which have targetPosition)
        if (targetPosition && timeRef.current > 5.0) {
            // ALIGNMENT LOGIC
            const k = 8.0; // Increased Spring stiffness
            const damping = 3.0; // Increased damping

            const currentPos = body.translation();
            const linVel = body.linvel();
            const angVel = body.angvel();

            // Force towards target
            const dist = new THREE.Vector3(
                targetPosition[0] - currentPos.x,
                targetPosition[1] - currentPos.y,
                targetPosition[2] - currentPos.z
            );

            // Apply spring force
            body.applyImpulse({
                x: (dist.x * k - linVel.x * damping) * delta,
                y: (dist.y * k - linVel.y * damping) * delta,
                z: (dist.z * k - linVel.z * damping) * delta
            }, true);

            // Stabilize rotation (Upright)
            // Target rotation is 0,0,0
            const currentRot = body.rotation();
            const torque = {
                x: (-currentRot.x * 3.0 - angVel.x * 1.0) * delta,
                y: (-currentRot.y * 3.0 - angVel.y * 1.0) * delta,
                z: (-currentRot.z * 3.0 - angVel.z * 1.0) * delta
            };
            body.applyTorqueImpulse(torque, true);

            // Gravity Compensation (approximate)
            // Rapier gravity is default -9.81 on Y.
            // Mass is 1 (default). Impulse needed to counteract gravity for delta time:
            // F = m*a => F = 1 * 9.81. Impulse = F * dt = 9.81 * delta.
            body.applyImpulse({ x: 0, y: 9.81 * delta * 1.5, z: 0 }, true); // 1.5x to be safe

        } else {
            // ROLLING / FALLING LOGIC

            // Respawn logic
            if (translation.y < -20) {
                body.setTranslation({ x: 15, y: 5, z: 0 }, true);
                body.setLinvel({ x: 0, y: 0, z: 0 }, true);
                body.setAngvel({ x: 0, y: 0, z: 0 }, true);
                return;
            }

            // Constant push to the left
            if (translation.x > -10) {
                body.applyImpulse({ x: -0.05, y: 0, z: 0 }, true);
            }

            // Random "Tong-tong" bounce (Upward Impulse)
            if (Math.random() < 0.02) {
                const bounceStrength = 0.5 + Math.random() * 1.0;
                body.applyImpulse({ x: 0, y: bounceStrength, z: 0 }, true);
                body.applyTorqueImpulse({ x: 0, y: 0, z: (Math.random() - 0.5) * 0.1 }, true);
            }
        }
    });

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTexture: { value: texture },
                uColor: { value: new THREE.Color("#333333") }
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec3 uColor;
                varying vec2 vUv;
                void main() {
                    vec4 texColor = texture2D(uTexture, vUv);
                    if (texColor.a < 0.01) discard;
                    gl_FragColor = vec4(uColor, texColor.a);
                }
            `,
            transparent: true,
            side: THREE.DoubleSide
        });
    }, [texture]);

    if (!start) return null;

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            restitution={1.2}
            friction={0.5}
            colliders={false}
            linearDamping={0.1}
            angularDamping={0.1}
        >
            <CylinderCollider args={[0.5, 1]} rotation={[0, 0, Math.PI / 2]} />
            <mesh rotation={[0, 0, 0]}>
                <planeGeometry args={[1, 1]} />
                {isName ? (
                    <primitive object={shaderMaterial} attach="material" />
                ) : (
                    <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
                )}
            </mesh>
        </RigidBody>
    );
};

const ImageGroupModel = ({ url, scale }) => {
    const frontTexture = useTexture(url.front);
    const backTexture = useTexture(url.back);

    return (
        <group scale={scale}>
            {/* Back Image */}
            <mesh position={[0.2, 0.2, -0.1]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial map={backTexture} transparent side={THREE.DoubleSide} />
            </mesh>
            {/* Front Image */}
            <mesh position={[0, 0, 0.1]}>
                <planeGeometry args={[10, 10]} />
                <meshBasicMaterial map={frontTexture} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
};

const ModelCharacter = ({ model1Url, model2Url, scale1, scale2, position, delay }) => {
    const [stage, setStage] = useState(1);

    const currentUrl = stage === 1 ? model1Url : model2Url;
    const currentScale = stage === 1 ? scale1 : scale2;

    const gltfUrl = (typeof currentUrl === 'string') ? currentUrl : model1Url;
    const { scene } = useGLTF(gltfUrl);

    const clonedScene = useMemo(() => scene.clone(), [scene]);

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
        const translation = body.translation();

        // Respawn and Transform Logic
        if (translation.y < -20) {
            body.setTranslation({ x: 15, y: 5, z: 0 }, true);
            body.setLinvel({ x: 0, y: 0, z: 0 }, true);
            body.setAngvel({ x: 0, y: 0, z: 0 }, true);

            if (stage === 1) {
                setStage(2);
            }
            return;
        }

        body.applyImpulse({ x: -0.05, y: 0, z: 0 }, true);

        if (Math.random() < 0.02) {
            const bounceStrength = 0.5 + Math.random() * 1.0;
            body.applyImpulse({ x: 0, y: bounceStrength, z: 0 }, true);
            body.applyTorqueImpulse({ x: (Math.random() - 0.5) * 0.1, y: (Math.random() - 0.5) * 0.1, z: (Math.random() - 0.5) * 0.1 }, true);
        }
    });

    if (!start) return null;

    return (
        <RigidBody
            ref={rigidBodyRef}
            position={position}
            restitution={0.8}
            friction={0.5}
            colliders={false}
            linearDamping={0.1}
            angularDamping={0.1}
        >
            <CylinderCollider args={[1, 1]} rotation={[0, 0, Math.PI / 2]} />
            {typeof currentUrl === 'object' && currentUrl.type === 'image_group' ? (
                <ImageGroupModel url={currentUrl} scale={currentScale} />
            ) : (
                <primitive object={clonedScene} scale={currentScale} />
            )}
        </RigidBody>
    );
};

const RollingParade = () => {
    // 1. Title Characters - Aligning above DAEGUL (Y=4.5)
    // "굴러다니는 방법" = 7 chars
    const titleCharacters = [
        { url: '/images/title_main/굴.svg', delay: 0, target: [-3.6, 8.5, 0] },
        { url: '/images/title_main/러.svg', delay: 2, target: [-2.4, 8.5, 0] },
        { url: '/images/title_main/다.svg', delay: 4, target: [-1.2, 8.5, 0] },
        { url: '/images/title_main/니.svg', delay: 6, target: [0, 8.5, 0] },
        { url: '/images/title_main/는.svg', delay: 8, target: [1.2, 8.5, 0] },
        { url: '/images/title_main/방.svg', delay: 10, target: [2.8, 8.5, 0] }, // Gap for space: 1.6 logic?
        { url: '/images/title_main/법.svg', delay: 12, target: [4.0, 8.5, 0] },
    ];

    // 2. Student Models
    const modelCharacters = [
        {
            model1: '/models/jeong_ra_young.glb',
            model2: '/models/jeong_ra_young_2.glb',
            scale1: 1,
            scale2: 1,
            delay: 14
        },
        {
            model1: '/models/lee_hwi_chan.glb',
            model2: '/models/lee_hwi_chan.glb',
            scale1: 1.6,
            scale2: 1.6,
            delay: 16
        },
        {
            model1: '/models/park_jiwon.glb',
            model2: '/models/park_jiwon_v2.glb',
            scale1: 0.08,
            scale2: 1,
            delay: 18
        },
        {
            model1: '/models/park_mua_v2.glb',
            model2: '/models/park_mua_v2.glb',
            scale1: 1,
            scale2: 1,
            delay: 20
        },
        {
            model1: '/models/kim_hyunyoung.glb',
            model2: '/models/kim_hyunyoung.glb',
            scale1: 0.8,
            scale2: 0.8,
            delay: 22
        },
    ];

    // 3. Student Names
    const nameCharacters = [
        { url: '/images/student_name/정라영.png', delay: 24 },
        { url: '/images/student_name/이휘찬.png', delay: 26 },
        { url: '/images/student_name/박지원.png', delay: 28 },
        { url: '/images/student_name/박무아.png', delay: 30 },
        { url: '/images/student_name/김현영.png', delay: 32 },
    ];

    return (
        <group>
            {/* Title */}
            {titleCharacters.map((char, index) => (
                <TitleCharacter
                    key={`title-${index}`}
                    textureUrl={char.url}
                    position={[15, 5, 0]}
                    delay={char.delay}
                    targetPosition={char.target}
                />
            ))}

            {/* Models */}
            {modelCharacters.map((char, index) => (
                <ModelCharacter
                    key={`model-${index}`}
                    model1Url={char.model1}
                    model2Url={char.model2}
                    scale1={char.scale1}
                    scale2={char.scale2}
                    position={[15, 5, 0]}
                    delay={char.delay}
                />
            ))}

            {/* Names */}
            {nameCharacters.map((char, index) => (
                <TitleCharacter
                    key={`name-${index}`}
                    textureUrl={char.url}
                    position={[15, 5, 0]}
                    delay={char.delay}
                    isName={true}
                />
            ))}
        </group>
    );
};

export default RollingParade;
