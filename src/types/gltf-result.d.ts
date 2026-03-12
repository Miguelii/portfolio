import type * as THREE from 'three'

export interface GLTF {
    animations: AnimationClip[]
    scene: Group
    scenes: Group[]
    cameras: Camera[]
    asset: {
        copyright?: string | undefined
        generator?: string | undefined
        version?: string | undefined
        minVersion?: string | undefined
        extensions?: any
        extras?: any
    }
    parser: GLTFParser
    userData: any
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
