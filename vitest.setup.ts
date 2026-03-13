import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import './src/lib/__mocks__/intersection-observer-mock'

afterEach(() => {
    cleanup()
})
