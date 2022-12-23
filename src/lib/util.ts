import {derived, writable} from 'svelte/store'
import type {Writable} from 'svelte/store'
import base64 from 'crypto-js/enc-base64'
import utf8 from 'crypto-js/enc-utf8'
import sha256 from 'crypto-js/sha256'


export const itemsInCart: Writable<number> = writable(0)
export const countHash = derived(itemsInCart, v => sha256(String(v)))

export const isFirefox = false

export const b64 = (input: any, method = 'encode'): string => {
    try {
        return method === 'encode'
            ? base64.stringify(utf8.parse(String(input)))
            : utf8.stringify(base64.parse(String(input)))
    } catch (e) {
        return ''
    }
}

export const toBase = (input: number, base: number, pad: number | null = null): string => {
    try {
        let string = BigInt(input).toString(base)
        return pad ? string.padStart(pad, '0') : string
    } catch (e) {
        return ''
    }
}
