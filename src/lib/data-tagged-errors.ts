import { Data } from 'effect'

const DataDefaultTaggedError = <T extends string>(tag: T) =>
    Data.TaggedError(tag)<{ cause: unknown; message?: string }>

export class ValidationError extends DataDefaultTaggedError('ValidationError') {}

export class CookieStoreError extends DataDefaultTaggedError('CookieStoreError') {}

export class CookieParseError extends DataDefaultTaggedError('CookieParseError') {}

export class SanityFetchError extends DataDefaultTaggedError('SanityFetchError') {}

export class UnauthorizedError extends DataDefaultTaggedError('UnauthorizedError') {}

export class ApiKeyError extends DataDefaultTaggedError('ApiKeyError') {}
