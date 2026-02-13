'use client'

import type { Project } from '@/features/projects/types/Project'
import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

// Separate file because we need it to be “use client” for the GTM event
// and we don't force the entire component to be client

type Props = PropsWithChildren<{
    project: Project
    className?: string
}>

export function ProjectsSectionItemWrapper({ children, project, className }: Props) {
    if (project.link) {
        return (
            <Link
                href={project.link}
                prefetch={false}
                target="_blank"
                className={className}
                onClick={() =>
                    sendGTMEvent({ event: 'projectClicked', value: `project_${project.title}` })
                }
                rel="noopener"
            >
                {children}
            </Link>
        )
    }

    return <div className={className}>{children}</div>
}
