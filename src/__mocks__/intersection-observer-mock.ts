class MockIntersectionObserver {
    observe() {
        return null
    }

    unobserve() {
        return null
    }

    disconnect() {
        return null
    }

    takeRecords() {
        return []
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
globalThis.IntersectionObserver = MockIntersectionObserver as any
