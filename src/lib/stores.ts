import {readable, writable, derived} from 'svelte/store'
import type {Writable} from 'svelte/store'

export const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date())
    }, 1000)

    return function stop() {
        clearInterval(interval)
    }
})

const start = new Date()

export const elapsed = derived(
    time,
    ($time: Date) => Math.round(($time.valueOf() - start.valueOf()) / 1000)
)

export const hashInput: Writable<string> = writable('')
export const encodeInput: Writable<string> = writable('')
export const decodeInput: Writable<string> = writable('')
export const numberInput: Writable<string> = writable('')
export const numberInputType: Writable<string> = writable('10')
