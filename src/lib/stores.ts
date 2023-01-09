import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export const hashInput: Writable<string> = writable('')
export const encodeInput: Writable<string> = writable('')
export const decodeInput: Writable<string> = writable('')
export const numberInput: Writable<string> = writable('')
export const numberInputType: Writable<string> = writable('10')
export const timeInput: Writable<string> = writable('')
export const timeInputType: Writable<string> = writable('fromSeconds')
export const netInput: Writable<string> = writable('')
export const emojiInput: Writable<string> = writable('')
export const emojiGhOnly: Writable<boolean> = writable(false)

export const darkModeEnabled: Writable<boolean> = writable(false)
