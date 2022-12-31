import base64 from 'crypto-js/enc-base64'
import utf8 from 'crypto-js/enc-utf8'

export const isBrowser: boolean = typeof window !== 'undefined' && typeof document !== 'undefined'
export const userAgent: string = isBrowser ? window.navigator.userAgent : ''
export const isFirefox: boolean = isBrowser
    && (userAgent.indexOf(' Firefox/') !== -1 || userAgent.indexOf(' Gecko/') !== -1)
export const runningAsExtension: boolean = !(
    typeof globalThis != 'object'
    || typeof chrome != 'object'
    || !chrome
    || !chrome.runtime
    || !chrome.runtime.id
)
export const hasClipboardItem: boolean = typeof ClipboardItem !== 'undefined'
export const getWdtElement = () => document.querySelector('.wdt') as HTMLElement
export const getInput = () => document.getElementById('wdtInput') as HTMLTextAreaElement
export const focusInput = (): void => getInput()?.focus()
export const waitForFonts = async (): Promise<FontFaceSet> => await document.fonts.ready

export function resizeTypeSelectorIfPresent() {
    // https://stackoverflow.com/a/67240166/409179
    let target = document.querySelector('.wdt-input select') as HTMLSelectElement
    if (!target) return

    let tempSelect = target.cloneNode() as HTMLSelectElement,
        tempOption = document.createElement('option')

    tempOption.textContent = target.options[target.selectedIndex].text
    tempSelect.style.width = 'auto'
    tempSelect.style.visibility = 'hidden'
    tempSelect.style.position = 'fixed'
    tempSelect.appendChild(tempOption)
    target.after(tempSelect)
    target.style.width = `${tempSelect.getBoundingClientRect().width}px`
    tempSelect.remove()
}

export async function createPopoutWindow(href: string | null = null) {
    if (!runningAsExtension) return

    if (href === null) {
        href = chrome.runtime.getURL('index.html')
    }

    const rect = getWdtElement().getBoundingClientRect()
    const [initialW, initialH] = [rect.width + 30, rect.height + 50]

    if (isFirefox) {
        window.open(href, 'devToolboxPopout', `resizable,width=${initialW},height=${initialH}`)
    } else {
        await chrome.windows.create({
            url: href,
            type: 'popup',
            width: initialW,
            height: initialH,
        })
    }

    window.close()
}

export function b64(input: any, method = 'encode'): string {
    try {
        return method === 'encode'
            ? base64.stringify(utf8.parse(String(input)))
            : utf8.stringify(base64.parse(String(input)))
    } catch (e) {
        return ''
    }
}

export function toBase(input: string, base: number, pad: number | null = null): string {
    try {
        let string = BigInt(input).toString(base)
        return pad ? string.padStart(pad, '0') : string
    } catch (e) {
        return ''
    }
}

export function runCalc(fn: (input: any) => string, value: any): string {
    if (!value) return ''

    try {
        return fn(value)
    } catch (e) {
        return ''
    }
}