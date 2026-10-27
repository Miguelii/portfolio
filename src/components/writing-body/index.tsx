import Link from 'next/link'
import {
    PortableText,
    toPlainText,
    type PortableTextComponents,
    type PortableTextMarkComponentProps,
    type PortableTextTypeComponentProps,
} from '@portabletext/react'
import { highlight } from 'sugar-high'
import { lang } from 'sugar-high/lang'
import type { WritingPost } from '@/sanity/generated/sanity.types'
import { slugify } from '@/lib/utils'

type WritingBodyValue = NonNullable<WritingPost['body']>

type WritingBodyBlock = Extract<WritingBodyValue[number], { _type: 'block' }>

type WritingCodeBlock = Extract<WritingBodyValue[number], { _type: 'codeBlock' }>

type WritingLink = NonNullable<WritingBodyBlock['markDefs']>[number]

const LINK_CLASS_NAME =
    'font-medium text-primary underline decoration-divider decoration-[1.5px] underline-offset-2 transition-colors hover:decoration-neutral'

function Anchor({ value, children }: PortableTextMarkComponentProps<WritingLink>) {
    const href = value?.href ?? ''

    if (href.startsWith('http')) {
        return (
            <a className={LINK_CLASS_NAME} href={href} target="_blank" rel="noreferrer">
                {children}
            </a>
        )
    }

    return (
        <Link className={LINK_CLASS_NAME} prefetch={false} href={href}>
            {children}
        </Link>
    )
}

function CodeBlock({ value }: PortableTextTypeComponentProps<WritingCodeBlock>) {
    const source = value.code?.code?.trimEnd() ?? ''
    const language = lang(value.code?.language ?? '')

    return (
        <>
            <pre className="code-block -mx-6 mt-8 mb-[35px] overflow-x-auto border-y border-divider bg-white px-6 py-5 font-mono text-[13px]/6 sm:mx-0 sm:rounded-xl sm:border-0 sm:px-5 sm:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.04)]">
                {language ? (
                    <code
                        dangerouslySetInnerHTML={{ __html: highlight(source, { lang: language }) }}
                    />
                ) : (
                    <code>{source}</code>
                )}
            </pre>
            {value.caption && (
                <p className="-mt-5 mb-8 text-center text-xs text-neutral">{value.caption}</p>
            )}
        </>
    )
}

const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => (
            <p className="mb-[26px] text-pretty text-primary/90">{children}</p>
        ),
        // The heading links to itself so sections can be shared
        h2: ({ children, value }) => {
            const id = slugify(toPlainText(value))

            return (
                <h2
                    id={id}
                    className="group relative mt-12 mb-5 w-fit scroll-mt-8 font-medium text-primary md:mt-14"
                >
                    <a href={`#${id}`} className="outline-none focus-visible:underline">
                        <span
                            aria-hidden="true"
                            className="absolute top-0 -left-5 text-neutral opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                        >
                            #
                        </span>
                        {children}
                    </a>
                </h2>
            )
        },
    },
    list: {
        bullet: ({ children }) => (
            <ul className="mb-[26px] flex list-disc flex-col gap-2 pl-5 text-primary/90 marker:text-neutral">
                {children}
            </ul>
        ),
        number: ({ children }) => (
            <ol className="mb-[26px] flex list-decimal flex-col gap-2 pl-5 text-primary/90 marker:text-neutral">
                {children}
            </ol>
        ),
    },
    listItem: ({ children }) => <li className="text-pretty pl-1">{children}</li>,
    marks: {
        em: ({ children }) => (
            <em className="font-serif text-[1.1em] leading-none italic">{children}</em>
        ),
        strong: ({ children }) => <strong className="font-medium text-primary">{children}</strong>,
        code: ({ children }) => (
            <code className="rounded-md border border-divider bg-neutral-light px-[0.3em] py-0.5 font-mono text-[0.857em] text-primary">
                {children}
            </code>
        ),
        link: Anchor,
    },
    types: {
        codeBlock: CodeBlock,
    },
}

export function WritingBody({ value }: Readonly<{ value: WritingBodyValue }>) {
    return <PortableText value={value} components={components} />
}
