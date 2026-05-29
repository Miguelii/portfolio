export const ABOUT_SECTION_GROQ = `
    *[_id == "aboutSection"][0] {
        title,
        "paragraphs": paragraphs[] { "id": _key, text }
    }
`
