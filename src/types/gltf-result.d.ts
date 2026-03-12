import type { ObjectMap } from '@react-three/fiber'
import type * as THREE from 'three'

export type GLTFNodes = ObjectMap['nodes'] & {
    card: THREE.Mesh
    clamp: THREE.Mesh
    clip: THREE.Mesh
}

export type GLTFMaterials = ObjectMap['materials'] & {
    texture: THREE.MeshStandardMaterial
    metal: THREE.MeshStandardMaterial
}
