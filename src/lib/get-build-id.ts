import { ClientEnv } from '@/env/client'

export const getBuildId = () => {
   return !ClientEnv.NEXT_PUBLIC_BUILD_TIMESTAMP ? '' : ClientEnv.NEXT_PUBLIC_BUILD_TIMESTAMP
}
