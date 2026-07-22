import { Data } from 'effect'

export const DataDefaultTaggedError = <T extends string>(tag: T) =>
    Data.TaggedError(tag)<{ cause: unknown; message?: string }>
