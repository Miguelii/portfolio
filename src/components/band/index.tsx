'use client'

import * as THREE from 'three'
import {
    Canvas,
    extend,
    type ObjectMap,
    type ThreeEvent,
    useFrame,
    useThree,
} from '@react-three/fiber'
import { Environment, Lightformer, useGLTF } from '@react-three/drei'
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
import { BAND_CARD_MODEL_URL } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/use-media-query'

extend({ MeshLineGeometry, MeshLineMaterial })

function parseBandModel({ nodes, materials }: ObjectMap) {
    const { card, clamp, clip } = nodes
    const { metal, texture } = materials

    if (
        !(card instanceof THREE.Mesh) ||
        !(clamp instanceof THREE.Mesh) ||
        !(clip instanceof THREE.Mesh) ||
        !(metal instanceof THREE.MeshStandardMaterial) ||
        !(texture instanceof THREE.MeshStandardMaterial)
    ) {
        throw new Error(`${BAND_CARD_MODEL_URL} is missing the band card meshes or materials`)
    }

    return { nodes: { card, clamp, clip }, materials: { metal, texture } }
}

// SAFETY: R3F replaces the DOM event target with its own pointer-capture handle
// (set/release/hasPointerCapture), but its typings still declare the DOM EventTarget.
const pointerCaptureTarget = (event: ThreeEvent<PointerEvent>) =>
    event.target as EventTarget & Pick<Element, 'releasePointerCapture' | 'setPointerCapture'>

// rendering-hoist-jsx: static JSX hoisted outside component — never recreated on re-render
const bandLighting = (
    <Environment blur={0.75}>
        <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
        />
        <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
        />
        <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
        />
        <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
        />
    </Environment>
)

// rerender-memo: memoized to prevent re-renders from BandCanvas
const Band = memo(function Band() {
    const maxSpeed = 50
    const minSpeed = 50

    const model = useGLTF(BAND_CARD_MODEL_URL)
    const { nodes, materials } = useMemo(() => parseBandModel(model), [model])

    const band = useRef<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>>>(null)
    const fixed = useRef<RapierRigidBody>(null)
    const j1 = useRef<RapierRigidBody>(null)
    const j2 = useRef<RapierRigidBody>(null)
    const j3 = useRef<RapierRigidBody>(null)
    const card = useRef<RapierRigidBody>(null)

    const [drag, setDrag] = useState<THREE.Vector3 | false>(false)
    const [hover, setHover] = useState<boolean>(false)

    useEffect(
        function BandHoverAndDrag() {
            if (hover) {
                document.body.style.cursor = drag ? 'grabbing' : 'grab'
                return () => void (document.body.style.cursor = 'auto')
            }
        },
        [hover, drag]
    )

    // rerender-use-ref-transient-values: vectors allocated once, mutated in useFrame
    const { ang, rot, vec, dir } = useMemo(
        () => ({
            ang: new THREE.Vector3(),
            rot: new THREE.Vector3(),
            vec: new THREE.Vector3(),
            dir: new THREE.Vector3(),
        }),
        []
    )

    const { width, height } = useThree((state) => state.size)

    const isMobile = useMediaQuery('(max-width: 1023px)')

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

    // rerender-lazy-state-init: curveType set once inside the initializer
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

    // rerender-memo: memoized to avoid new Vector2 every render
    const resolution = useMemo(() => new THREE.Vector2(width, height), [width, height])

    // smoothed rope joint positions, keyed by rigid body and mutated in useFrame
    const [lerpedPositions] = useState(() => new WeakMap<RapierRigidBody, THREE.Vector3>())

    useFrame((state, delta) => {
        if (drag) {
            vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
            dir.copy(vec).sub(state.camera.position).normalize()
            vec.add(dir.multiplyScalar(state.camera.position.length()))
            ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
            card.current?.setNextKinematicTranslation({
                x: vec.x - drag.x,
                y: vec.y - drag.y,
                z: vec.z - drag.z,
            })
        }

        // lerp j1 and j2 every frame (init once, then always update)
        ;[j1, j2].forEach((ref) => {
            if (!ref.current) return
            let lerped = lerpedPositions.get(ref.current)
            if (!lerped) {
                lerped = new THREE.Vector3().copy(ref.current.translation())
                lerpedPositions.set(ref.current, lerped)
            }
            const clampedDistance = Math.max(
                0.1,
                Math.min(1, lerped.distanceTo(ref.current.translation()))
            )
            lerped.lerp(
                ref.current.translation(),
                delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
            )
        })

        if (j3.current) curve.points[0].copy(j3.current.translation())
        if (j2.current)
            curve.points[1].copy(lerpedPositions.get(j2.current) ?? j2.current.translation())
        if (j1.current)
            curve.points[2].copy(lerpedPositions.get(j1.current) ?? j1.current.translation())
        if (fixed.current) curve.points[3].copy(fixed.current.translation())

        // @ts-expect-error geometry points
        if (band.current) band.current.geometry.setPoints(curve.getPoints(32))

        // force card to always face front
        if (card.current) {
            ang.copy(card.current.angvel())
            rot.copy(card.current.rotation())
            card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true)
        }
    })

    // advanced-event-handler-refs: stable callbacks via useCallback
    const handleGrabCard = useCallback((e: ThreeEvent<PointerEvent>) => {
        pointerCaptureTarget(e).releasePointerCapture(e.pointerId)
        setDrag(false)
    }, [])

    const handleReleaseCard = useCallback(
        (e: ThreeEvent<PointerEvent>) => {
            const newCardLoc = card.current
                ? card.current.translation()
                : new THREE.Vector3(0, 0, 0)
            pointerCaptureTarget(e).setPointerCapture(e.pointerId)
            setDrag(new THREE.Vector3().copy(e.point).sub(vec.copy(newCardLoc)))
        },
        [vec]
    )

    return (
        <>
            <group position={isMobile ? [0, 8.5, 0] : [3.5, 8.5, 0]}>
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
                    type={drag ? 'kinematicPosition' : 'dynamic'}
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
                        onPointerOver={() => setHover(true)}
                        onPointerOut={() => setHover(false)}
                        onPointerUp={handleGrabCard}
                        onPointerDown={handleReleaseCard}
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
                    args={[{ resolution }]}
                />
            </mesh>
        </>
    )
})

// rerender-memo: memoized canvas to prevent unnecessary re-renders
const BandCanvas = memo(function BandCanvas() {
    return (
        <Canvas camera={{ fov: 25, position: [0, 0, 16] }}>
            <Physics colliders={false} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
                <Band />
            </Physics>
            {bandLighting}
        </Canvas>
    )
})

useGLTF.preload(BAND_CARD_MODEL_URL)

export default BandCanvas
