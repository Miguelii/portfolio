'use client'

import * as THREE from 'three'
import { Canvas, extend, type ThreeEvent, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { MeshLineGeometry, MeshLineMaterial, raycast } from 'meshline'
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    BallCollider,
    CuboidCollider,
    Physics,
    type RapierRigidBody,
    RigidBody,
    useRopeJoint,
    useSphericalJoint,
} from '@react-three/rapier'
import type { GLTFResult } from '@/components/ui/band/types/GLTFResult'
import { BandLighting } from './band-lighting'
import type { BandProps } from './types/BandProps'

useGLTF.preload('/models/card.glb')

extend({ MeshLineGeometry, MeshLineMaterial })

const BandCanvas = memo(function BandCanvas() {
    return (
        <Canvas camera={{ fov: 25, position: [0, 0, 16] }} className="z-[900]">
            <Physics colliders={false} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                <Band />
            </Physics>
            <BandLighting />
        </Canvas>
    )
})

// Main Component
const Band = memo(function Band({ maxSpeed = 50, minSpeed = 10 }: BandProps) {
    // 3d Model geometry and materials
    const { nodes, materials } = useGLTF('/models/card.glb') as unknown as GLTFResult

    const band = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(null)
    const fixed = useRef<RapierRigidBody>(null)
    const j1 = useRef<RapierRigidBody>(null)
    const j2 = useRef<RapierRigidBody>(null)
    const j3 = useRef<RapierRigidBody>(null)
    const card = useRef<RapierRigidBody>(null)

    // states
    const [dragged, drag] = useState<THREE.Vector3 | false>(false)
    const [hovered, hover] = useState<boolean>(false)

    useEffect(() => {
        if (hovered) {
            document.body.style.cursor = dragged ? 'grabbing' : 'grab'
            return () => void (document.body.style.cursor = 'auto')
        }
    }, [hovered, dragged])

    // vectors
    const vectors = useMemo(
        () => ({
            ang: new THREE.Vector3(),
            rot: new THREE.Vector3(),
            vec: new THREE.Vector3(),
            dir: new THREE.Vector3(),
        }),
        []
    )
    const { ang, rot, vec, dir } = vectors

    // for resolution
    const { width, height } = useThree((state) => state.size)

    // rope joints
    // @ts-expect-error rope join
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 2])
    // @ts-expect-error rope join
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 2])
    // @ts-expect-error rope join
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 2])
    // @ts-expect-error rope join
    useSphericalJoint(j3, card, [
        [0, 0, 0],
        [0, 1.4, 0],
    ])

    const [curve] = useState(() => {
        const c = new THREE.CatmullRomCurve3([
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
            new THREE.Vector3(),
        ])

        c.curveType = 'chordal'
        return c
    })

    useFrame((state, delta) => {
        if (dragged) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))
            ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({
                x: vec.x - dragged.x,
                y: vec.y - dragged.y,
                z: vec.z - dragged.z,
            })
        }

        if (j3.current) curve.points[0].copy(j3.current.translation())
        if (j2.current) curve.points[1].copy(j2.current.translation())
        if (j1.current) curve.points[2].copy(j1.current.translation())
        if (fixed.current) curve.points[3].copy(fixed.current.translation())

        // @ts-expect-error geometry points
        if (band.current) band.current.geometry.setPoints(curve.getPoints(32))

        // lerp fix, when dragging
        if (j3.current && j2.current && j1.current && band.current && fixed.current) {
            ;[j1, j2].forEach((ref) => {
                // @ts-expect-error lerping
                if (ref.current && !ref.current.lerped) {
                    // @ts-expect-error lerping
                    ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())

                    const clampedDistance = Math.max(
                        0.1,
                        Math.min(
                            1,
                            // @ts-expect-error lerping
                            ref.current.lerped.distanceTo(ref.current.translation())
                        )
                    )
                    // @ts-expect-error lerping
                    ref.current.lerped.lerp(
                        ref.current.translation(),
                        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
                    )
                }
            })
        }

        // force card to always face front
        if (card.current) {
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
        }
    })

    const handleGrabCard = useCallback((e: ThreeEvent<PointerEvent>) => {
        const target = e.target as HTMLElement
        target.releasePointerCapture(e.pointerId)
        drag(false)
    }, [])

    const handleReleaseCard = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            const target = e.target as HTMLElement

            // Verifica a posição atual do card via ref
            const newCardLoc = card.current
                ? card.current.translation()
                : new THREE.Vector3(0, 0, 0)

            target.setPointerCapture(e.pointerId)

            // Executa a função drag
            drag(new THREE.Vector3().copy(e.point).sub(vec.copy(newCardLoc)))
        },
        [vec]
    )

    return (
        <>
            <group position={[3.5, 8.5, 0]}>
                <RigidBody
                    type="fixed"
                    colliders={false}
                    canSleep={true}
                    ref={fixed}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    type="dynamic"
                    position={[1, 0, 0]}
                    colliders={false}
                    ref={j1}
                    canSleep={true}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    type="dynamic"
                    colliders={false}
                    position={[2, 0, 0]}
                    ref={j2}
                    canSleep={true}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[3, 0, 0]}
                    colliders={false}
                    ref={j3}
                    canSleep={true}
                    type="dynamic"
                    angularDamping={2}
                    linearDamping={2}
                >
                    <BallCollider args={[0.1]} />
                </RigidBody>
                <RigidBody
                    position={[4, 0, 0]}
                    ref={card}
                    type={dragged ? 'kinematicPosition' : 'dynamic'}
                    colliders={false}
                    canSleep={false}
                    angularDamping={2}
                    linearDamping={2}
                >
                    <CuboidCollider position={[0, -1, 0]} args={[1.4, 1.95, 0.01]} />
                    <group
                        scale={2.75}
                        position={[-0.01, -3, -0.05]}
                        rotation={[0, -Math.PI / 2, 0]}
                        onPointerOver={() => hover(true)}
                        onPointerOut={() => hover(false)}
                        onPointerUp={(e) => handleGrabCard(e)}
                        onPointerDown={(e) => handleReleaseCard(e)}
                    >
                        <mesh
                            geometry={nodes.clip.geometry}
                            material={materials.metal}
                            material-roughness={0.3}
                        />
                        <mesh
                            geometry={nodes.clamp.geometry}
                            material={materials.metal}
                            material-roughness={0.3}
                        />
                        <mesh geometry={nodes.card.geometry}>
                            <meshPhysicalMaterial
                                map={materials.texture.map}
                                map-anisotropy={16}
                                clearcoat={1}
                                clearcoatRoughness={0.15}
                                roughness={0.75}
                                metalness={0.1}
                            />
                        </mesh>
                    </group>
                </RigidBody>
            </group>
            <mesh raycast={raycast} ref={band}>
                <meshLineGeometry />
                <meshLineMaterial
                    transparent
                    opacity={0.2}
                    color={'black'}
                    depthTest={false}
                    lineWidth={1.5}
                    args={[{ resolution: new THREE.Vector2(width, height) }]}
                />
            </mesh>
        </>
    )
})

export default BandCanvas
