'use client'

import { Sun, Moon, Stars } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeChanger() {
    const { theme, setTheme } = useTheme()

    const [mounted, setMounted] = useState(false)

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    useEffect(() => {
        if (!mounted) setMounted(true)
    }, [mounted])

    if (!mounted) return

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                'relative w-20 h-10 rounded-full transition-all duration-500 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-30 transform hover:scale-105',
                theme === 'dark'
                    ? 'bg-slate-800 focus:ring-slate-400'
                    : 'bg-neutral-200 focus:ring-slate-300'
            )}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {/* Toggle Circle */}
            <div
                className={cn(
                    'absolute top-1 w-8 h-8 rounded-full transition-all duration-500 ease-in-out flex items-center justify-center shadow-lg',
                    theme === 'dark' ? 'left-11 bg-slate-900' : 'left-1 bg-white'
                )}
            >
                {/* Icon Container with Rotation Animation */}
                <div className="relative w-5 h-5">
                    {/* Sun Icon */}
                    <Sun
                        className={cn(
                            'absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-500',
                            theme === 'light'
                                ? 'opacity-100 rotate-0 scale-100'
                                : 'opacity-0 rotate-180 scale-75'
                        )}
                    />

                    {/* Moon Icon */}
                    <Moon
                        className={cn(
                            'absolute inset-0 w-5 h-5 text-blue-300 transition-all duration-500',
                            theme === 'dark'
                                ? 'opacity-100 rotate-0 scale-100'
                                : 'opacity-0 -rotate-180 scale-75'
                        )}
                    />
                </div>
            </div>

            {/* Background Stars for Dark Mode */}
            <div
                className={cn(
                    'absolute inset-0 flex items-center justify-start pl-2 transition-all duration-500',
                    theme === 'dark' ? 'opacity-100' : 'opacity-0'
                )}
            >
                <Stars className="w-3 h-3 text-yellow-300 animate-pulse" />
            </div>
        </button>
    )
}
