import type { GLTF } from 'three-stdlib'
import type * as THREE from 'three'

export type BandProps = {
    maxSpeed?: number
    minSpeed?: number
}
// type for GLTF loader
export type GLTFResult = GLTF & {
    nodes: {
        card: THREE.Mesh
        clamp: THREE.Mesh
        clip: THREE.Mesh
    }
    materials: {
        texture: THREE.MeshStandardMaterial
        metal: THREE.MeshStandardMaterial
    }
}
