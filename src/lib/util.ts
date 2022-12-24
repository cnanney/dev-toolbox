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
export const getInput = () => document.querySelector('.wdt-input textarea') as HTMLElement | null
export const focusInput = (): void => getInput()?.focus()

export function resizeTypeSelector() {
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

export function b64(input: any, method = 'encode'): string {
    try {
        return method === 'encode'
            ? base64.stringify(utf8.parse(String(input)))
            : utf8.stringify(base64.parse(String(input)))
    } catch (e) {
        return ''
    }
}

export function toBase(input: number, base: number, pad: number | null = null): string {
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
