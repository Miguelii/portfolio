'use client'

import type { ProjectType } from '@/types/Project'
import { sendGTMEvent } from '@next/third-parties/google'
import Link from 'next/link'
import type { PropsWithChildren } from 'react'

// Separate file because we need it to be “use client” for the GTM event
// and we don't force the entire component to be client

type Props = PropsWithChildren<{
    project: ProjectType
}>

export default function ProjectsSectionItemWrapper({ children, project }: Props) {
    if (project.link) {
        return (
            <Link
                href={project.link}
                prefetch={false}
                target="_blank"
                className="flex flex-col p-5 sm:p-6 md:p-8 border gap-3 border-divider h-full hover:shadow-xl"
                onClick={() =>
                    sendGTMEvent({ event: 'projectClicked', value: `project_${project.title}` })
                }
            >
                {children}
            </Link>
        )
    }

    return (
        <div className="flex flex-col p-5 sm:p-6 md:p-8 border gap-3 border-divider h-full">
            {children}
        </div>
    )
}
