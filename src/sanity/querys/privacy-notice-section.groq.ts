export const PRIVACY_NOTICE_SECTION_GROQ = `
    *[_type == "privacyNoticeSection"][0] {
        title,
        _updatedAt,
        "paragraphs": paragraphs[] { "id": _key, text }
    }
`
