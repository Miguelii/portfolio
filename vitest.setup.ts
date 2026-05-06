import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import './src/__tests__/intersection-observer-mock'

expect.extend(matchers)

afterEach(() => {
    cleanup()
})
