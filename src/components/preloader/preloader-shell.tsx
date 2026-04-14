/**
 * Server-rendered preloader shell.
 *
 * Renders the preloader's initial visual state (dark overlay + "Hello" text)
 * as plain HTML/CSS directly in the static page — no JavaScript required.
 *
 * This ensures the preloader is part of the very first paint (FCP), so
 * Lighthouse counts it as visual progress for Speed Index instead of seeing
 * a blank white screen until React hydrates.
 *
 * The client-side `Preloader` component removes this shell on mount
 * via `document.getElementById('preloader-shell')?.remove()` and takes
 * over with the animated version.
 */
export function PreloaderShell() {
    return (
        <div
            id="preloader-shell"
            aria-hidden="true"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 98,
                display: 'flex',
                height: '100vh',
                width: '100vw',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1d1d1d',
            }}
        >
            <p
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#fbfbfd',
                    fontSize: '42px',
                }}
            >
                <span
                    style={{
                        marginRight: '0.5rem',
                        display: 'block',
                        height: '10px',
                        width: '10px',
                        borderRadius: '9999px',
                        backgroundColor: '#fbfbfd',
                    }}
                />{' '}
                Hello
            </p>
        </div>
    )
}
