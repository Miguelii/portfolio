import { ClientEnv } from '@/env/client'

export function normalizeBaseUrl(): string | undefined {
   const base = ClientEnv.NEXT_PUBLIC_VERCEL_URL ?? null

   if (!base) return undefined

   if (base.startsWith('http://') || base.startsWith('https://')) {
      return base
   }

   return `https://${base}`
}
