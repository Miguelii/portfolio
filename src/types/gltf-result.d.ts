import type { ObjectMap } from '@react-three/fiber'
import type { Mesh, MeshStandardMaterial } from 'three'

export type GLTFNodes = ObjectMap['nodes'] & {
    card: Mesh
    clamp: Mesh
    clip: Mesh
}

export type GLTFMaterials = ObjectMap['materials'] & {
    texture: MeshStandardMaterial
    metal: MeshStandardMaterial
}
