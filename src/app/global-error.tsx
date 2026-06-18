'use client'

import { useEffect } from 'react'
import { Logger } from '@/lib/logger'

type Props = {
    error: Error & { digest?: string }
    reset: () => void
}

// Catches errors thrown by the root layout itself. It replaces the whole document,
// so it renders its own <html>/<body> and uses inline styles (the global stylesheet
// is not guaranteed to be available here) with the theme tokens.
export default function GlobalError({ error, reset }: Props) {
    useEffect(() => {
        Logger({ level: 'error', error, context: 'global error boundary' })
    }, [error])

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    padding: '1.5rem',
                    textAlign: 'center',
                    backgroundColor: '#fbfbfd',
                    color: '#262626',
                    fontFamily: 'system-ui, sans-serif',
                }}
            >
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
                        Something went wrong.
                    </h1>
                    <p style={{ color: '#737373', margin: 0 }}>
                        An unexpected error occurred. Please try again.
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => reset()}
                    style={{
                        cursor: 'pointer',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '0.5rem 1rem',
                        backgroundColor: '#262626',
                        color: '#fbfbfd',
                        fontSize: '1rem',
                    }}
                >
                    Try again
                </button>
            </body>
        </html>
    )
}
