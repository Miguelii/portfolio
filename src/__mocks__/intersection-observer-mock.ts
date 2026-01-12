class MockIntersectionObserver {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(callback?: IntersectionObserverCallback, options?: IntersectionObserverInit) {}

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
global.IntersectionObserver = MockIntersectionObserver as any
