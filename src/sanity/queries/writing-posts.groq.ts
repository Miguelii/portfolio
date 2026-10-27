export const WRITING_POSTS_GROQ = `
    *[_type == "writingPost" && defined(slug.current)] | order(publishedAt desc) {
        "id": _id,
        title,
        "slug": slug.current,
        publishedAt,
        summary
    }
`
