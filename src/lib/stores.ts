import type { Writable } from 'svelte/store'

type ValueOf<T> = T[keyof T]
type StoreSubscribeCb<T> = (val: T) => unknown
type StoreUpdateCb<T> = (val: T) => T
type StorageStores = {
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

const stores: { [k: string]: Writable<any> } = {}
const storage: { [k: string]: any } = {}

const keyedWritable = <Type>(storageKey: string, defaultValue: Type): Writable<Type> => {
    let _val = defaultValue
    const subs: StoreSubscribeCb<Type>[] = []

    const sync = (v: Type): void => {
        storage[storageKey] = v
        console.log('storage updated', storageKey, JSON.stringify(storage))
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

export const getSyncedStore = <Type>(key: string, defaultValue: Type): Writable<Type> => {
    if (!Object.hasOwn(stores, key)) {
        stores[key] = keyedWritable(key, defaultValue)
    }

    return stores[key]
}
