import { storageService } from '$lib/storage'
import type { Writable } from 'svelte/store'

type StoreSubscribeCb<T> = (val: T) => unknown
type StoreUpdateCb<T> = (val: T) => T

export type AppState = {
    hashInput?: string,
    encodeInput?: string,
    decodeInput?: string,
    numberInput?: string,
    numberInputType?: string,
    timeInput?: string,
    timeInputType?: string,
    netInput?: string,
    emojiInput?: string,
    emojiGhOnly?: boolean,
    darkModeEnabled?: boolean,
}

const storesDirectory: { [k: string]: Writable<any> } = {}

const keyedWritable = <Type>(key: string, defaultValue: Type): Writable<Type> => {
    let _val = defaultValue
    const subs: StoreSubscribeCb<Type>[] = []

    const sync = (v: Type): void => {
        storageService.set(key, v).save().then()
    }

    const subscribe = (cb: StoreSubscribeCb<Type>) => {
        subs.push(cb)
        cb(_val)

        return () => {
            const index = subs.findIndex((fn) => fn === cb)
            subs.splice(index, 1)
        }
    }

    const set = (v: Type) => {
        _val = v
        subs.forEach((fn) => fn(_val))
        sync(_val)
    }

    const update = (fn: StoreUpdateCb<Type>) => {
        set(fn(_val))
    }

    return {subscribe, set, update}
}

export const getSyncedStore = <Type>(key: keyof AppState, defaultValue: Type): Writable<Type> => {
    if (!Object.hasOwn(storesDirectory, key)) {
        storesDirectory[key] = keyedWritable(key, (storageService.get(key) ?? defaultValue))
    }

    return storesDirectory[key]
}
