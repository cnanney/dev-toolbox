export const isBrowser: boolean = typeof window !== 'undefined'
export const userAgent: string = isBrowser ? window.navigator.userAgent : ''
export const isFirefox: boolean = isBrowser
    && (userAgent.indexOf(' Firefox/') !== -1 || userAgent.indexOf(' Gecko/') !== -1)
export const runningAsExtension: boolean = !(typeof globalThis != 'object'
    || typeof chrome != 'object'
    || !chrome
    || !chrome.runtime
    || !chrome.runtime.id
)
