import type { ThreeElement } from '@react-three/fiber'
import type { MeshLineGeometry, MeshLineMaterial } from 'meshline'

// Type support for mesh line
declare module '@react-three/fiber' {
    interface ThreeElements {
        meshLineGeometry: ThreeElement<typeof MeshLineGeometry>
        meshLineMaterial: ThreeElement<typeof MeshLineMaterial>
    }
}
