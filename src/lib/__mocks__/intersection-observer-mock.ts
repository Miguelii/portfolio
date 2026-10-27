class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null

    readonly rootMargin = ''

    readonly scrollMargin = ''

    readonly thresholds: readonly number[] = []

    observe() {}

    unobserve() {}

    disconnect() {}

    takeRecords(): IntersectionObserverEntry[] {
        return []
    }
}

globalThis.IntersectionObserver = MockIntersectionObserver
