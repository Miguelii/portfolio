export const WRITING_POST_GROQ = `
    *[_type == "writingPost" && slug.current == $slug][0] {
        "id": _id,
        title,
        "slug": slug.current,
        publishedAt,
        summary,
        _updatedAt,
        body
    }
`
