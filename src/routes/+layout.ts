import { browser } from '$app/environment'
import { storageService } from '$lib/storage'
import type { TObject } from '$lib/types'
import type { LayoutData } from './$types'

export const prerender = true
// export const ssr = false
// export const csr = true
// export const trailingSlash = 'always'

export const load: TObject = (async () => {
    if (browser) {
        await storageService.init()
    }

    return {}
}) satisfies LayoutData
