# Band Component — Optimization Notes

The 3D band component (`src/components/ui/band/index.tsx`) renders a physics-based lanyard with a draggable card using Three.js, Rapier physics, and MeshLine.

## React Performance Optimizations

### Stable callbacks (`handleReleaseCard`)

Removed `vec` (mutable transient vector) from the `useCallback` dependency array. The callback now creates a fresh `Vector3` instead of relying on a shared mutable reference, making it completely stable (`[]` deps).

### Narrowed effect dependencies (cursor styling)

The cursor `useEffect` previously depended on the `drag` state object, which changes every frame during dragging. Replaced with a derived `isDragging` boolean so the effect only re-runs when drag starts/stops, not on every pointer move.

### Memoized group position

The `<group position={...}>` array was recreated every render. Now memoized with `useMemo` keyed on `isMobile` and `isSmallScreen`.

### Geometry update threshold (`prevPoints`)

The band mesh geometry (`setPoints`) was recalculated every frame even with no visible change. Now tracks previous curve control points and only updates when `distanceToSquared > 0.0001` (~0.01 units of movement). Eliminates micro-jitter from physics solver noise.

## Physics Stability Fixes

### Settling frame skip

The first ~30 frames of the `useFrame` loop are skipped entirely, allowing the physics engine to settle from initial positions before any geometry is rendered. This prevents the visible "snap" on mount.

### Vertical initial positions

RigidBody starting positions were changed from horizontal (`[1,0,0]`, `[2,0,0]`, ...) to vertical (`[0,-2,0]`, `[0,-4,0]`, ...), matching the natural resting state under gravity. This drastically reduces the settling distance and time.

### Angular velocity dead zone

The card's face-front correction (`setAngvel`) now has a `0.01 rad` dead zone. When `rot.y` is below this threshold, no correction is applied, preventing micro-forces from propagating through the joint chain at rest.

### Lerp snap threshold

When the distance between lerped and actual physics positions is below `0.05`, the lerped value snaps directly instead of continuing to asymptotically approach. Combined with the geometry update threshold, this ensures the band fully stabilizes.

### Differentiated lerp speeds

`minSpeed` was reduced from `50` to `10` (while `maxSpeed` stays at `50`). This makes the lerp distance-dependent: fast for large movements (responsive drag), slow for small movements (smooth convergence to rest).

### Increased damping

`angularDamping` and `linearDamping` on all RigidBody elements were increased from `2` to `4`. This makes the joint chain lose energy faster after drag release, reducing post-interaction oscillation.
