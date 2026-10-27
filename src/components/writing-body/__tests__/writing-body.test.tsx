import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { WritingBody } from '@/components/writing-body'

const span = (text: string, marks: string[] = []) => ({
    _type: 'span' as const,
    _key: text,
    text,
    marks,
})

describe('WritingBody', () => {
    it('should render paragraphs with inline code and emphasis marks', () => {
        const { container } = render(
            <WritingBody
                value={[
                    {
                        _type: 'block',
                        _key: 'p1',
                        style: 'normal',
                        markDefs: [],
                        children: [
                            span('Only '),
                            span('good', ['em']),
                            span(' results reach '),
                            span('unstable_cache', ['code']),
                        ],
                    },
                ]}
            />
        )

        expect(container.querySelector('p')).toHaveTextContent(
            'Only good results reach unstable_cache'
        )
        expect(container.querySelector('em')).toHaveTextContent('good')
        expect(container.querySelector('code')).toHaveTextContent('unstable_cache')
    })

    it('should give headings an id and a self link', () => {
        render(
            <WritingBody
                value={[
                    {
                        _type: 'block',
                        _key: 'h1',
                        style: 'h2',
                        markDefs: [],
                        children: [span('The same applies to '), span('use cache', ['code'])],
                    },
                ]}
            />
        )

        const heading = screen.getByRole('heading', { level: 2 })
        expect(heading).toHaveAttribute('id', 'the-same-applies-to-use-cache')
        expect(heading.querySelector('a')).toHaveAttribute('href', '#the-same-applies-to-use-cache')
    })

    it('should highlight code blocks and render their caption', () => {
        const { container } = render(
            <WritingBody
                value={[
                    {
                        _type: 'codeBlock',
                        _key: 'c1',
                        code: { _type: 'code', language: 'typescript', code: 'const a = null\n' },
                        caption: 'A cached failure.',
                    },
                ]}
            />
        )

        expect(container.querySelector('pre .sh__token--keyword')).toHaveTextContent('const')
        expect(screen.getByText('A cached failure.')).toBeInTheDocument()
    })

    it('should render code in an unknown language as plain text', () => {
        const { container } = render(
            <WritingBody
                value={[
                    {
                        _type: 'codeBlock',
                        _key: 'c2',
                        code: { _type: 'code', language: 'nope', code: '09:00 CMS fails' },
                    },
                ]}
            />
        )

        expect(container.querySelector('pre code')).toHaveTextContent('09:00 CMS fails')
        expect(container.querySelector('pre .sh__line')).toBeNull()
    })

    it('should open external links in a new tab', () => {
        render(
            <WritingBody
                value={[
                    {
                        _type: 'block',
                        _key: 'l1',
                        style: 'normal',
                        markDefs: [{ _type: 'link', _key: 'link1', href: 'https://nextjs.org' }],
                        children: [span('Next.js', ['link1'])],
                    },
                ]}
            />
        )

        expect(screen.getByRole('link', { name: 'Next.js' })).toHaveAttribute('target', '_blank')
    })
})
