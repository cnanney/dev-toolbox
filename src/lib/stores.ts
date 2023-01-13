import { storageService } from '$lib/storage'
import type { Writable } from 'svelte/store'

type StoreSubscribeCb<T> = (val: T) => unknown
type StoreUpdateCb<T> = (val: T) => T
type WritableStores = {
    hashInput: Writable<string>,
    encodeInput: Writable<string>,
    decodeInput: Writable<string>,
    numberInput: Writable<string>,
    numberInputType: Writable<string>,
    timeInput: Writable<string>,
    timeInputType: Writable<string>,
    netInput: Writable<string>,
    emojiInput: Writable<string>,
    emojiGhOnly: Writable<boolean>,
    darkModeEnabled: Writable<boolean>,
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

export const getSyncedStore = <Type>(key: keyof WritableStores, defaultValue: Type): Writable<Type> => {
    if (!Object.hasOwn(storesDirectory, key)) {
        storesDirectory[key] = keyedWritable(key, (storageService.get(key) ?? defaultValue))
    }

    return storesDirectory[key]
}
