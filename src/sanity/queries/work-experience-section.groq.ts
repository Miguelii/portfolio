export const WORK_EXPERIENCE_SECTION_GROQ = `
    *[_type == "workExperienceSection"][0] {
        title,
        "items": items[] {
            "id": _key,
            company,
            logoUrl,
            previewUrl,
            totalTime,
            "positions": positions[] {
                "id": _key,
                jobTitle,
                timeLabel,
                "achievements": achievements[] {
                    "id": _key,
                    text
                }
            }
        }
    }
`
