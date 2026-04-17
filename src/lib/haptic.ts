import { Effect } from 'effect'
import { Logger } from './logger'

export const supportsHaptic =
    typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false

function hasVibrate(
    nav: Navigator
): nav is Navigator & { vibrate: (pattern: number | number[]) => boolean } {
    return 'vibrate' in nav && typeof nav.vibrate === 'function'
}

const vibrateEffect = (pattern: number | number[]) => Effect.try(() => navigator.vibrate(pattern))

const iOSHapticEffect = Effect.acquireUseRelease(
    Effect.try(() => {
        const label = document.createElement('label')
        label.ariaHidden = 'true'
        label.style.display = 'none'

        const input = document.createElement('input')
        input.type = 'checkbox'
        input.setAttribute('switch', '')
        label.appendChild(input)
        document.body.appendChild(label)

        return label
    }),

    (label) => Effect.try(() => label.click()),

    (label) => Effect.sync(() => label.remove())
)

const hapticEffect = (pattern: number | number[] = 50): Effect.Effect<void> => {
    return Effect.gen(function* () {
        if (!supportsHaptic) return

        if (hasVibrate(navigator)) {
            yield* vibrateEffect(pattern)
            return
        }

        yield* iOSHapticEffect
    }).pipe(
        Effect.catchAll((error) =>
            Effect.sync(() =>
                Logger({
                    level: 'error',
                    error: error,
                    context: 'haptic',
                })
            )
        )
    )
}

/**
 * Trigger haptic feedback on mobile devices.
 * Uses Vibration API on Android/modern browsers, and iOS checkbox trick on iOS.
 *
 * @param pattern - Vibration duration (ms) or pattern.
 * Custom patterns only work on Android devices. iOS uses fixed feedback.
 * See [Vibration API](https://developer.mozilla.org/docs/Web/API/Vibration_API)
 *
 * @example
 * import { haptic } from "@/lib/haptic"
 *
 * <Button onClick={() => haptic()}>Haptic</Button>
 */
export function haptic(pattern: number | number[] = 50): void {
    Effect.runSync(hapticEffect(pattern))
}
