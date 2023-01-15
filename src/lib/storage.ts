import type { TObject } from '$lib/types'
import { runningAsExtension } from '$lib/util'

// Credit to https://github.com/bitwarden/clients/tree/master/apps/browser/src/services

export const STORAGE_KEY = 'state'

// Data is stored as single-level object with a key of "state"
abstract class AbstractStorageService {
    private _state: TObject = {}

    get state(): TObject {
        return this._state
    }

    set state(value: TObject) {
        this._state = value
    }

    async init(): Promise<void> {
        this.state = (await this.load()) || {}
    }

    get(key?: string, defaultValue: any = null): any {
        return resolveGet(this.state, key, defaultValue)
    }

    set(key: string, val: any): this {
        this._state[key] = val

        return this
    }

    abstract load(): Promise<TObject | null>;

    abstract save(): Promise<void>;

    abstract flush(): Promise<void>;
}

const resolveGet = (obj: TObject, key?: string, defaultValue: any = null): any => {
    if (key == null) return obj
    let value = obj[key]

    return value === undefined ? defaultValue : value
}

class ChromeStorageService extends AbstractStorageService {
    protected chromeStorageApi: chrome.storage.StorageArea = chrome.storage.local

    async load(): Promise<TObject | null> {
        return new Promise((resolve) => {
            this.chromeStorageApi.get(STORAGE_KEY, (obj: TObject) => {
                const val = obj[STORAGE_KEY]
                if (val != null) {
                    resolve(val as TObject)
                    return
                }
                resolve(null)
            })
        })
    }

    async save(): Promise<void> {
        const keyedObj = {[STORAGE_KEY]: this.state}
        return new Promise<void>((resolve) => {
            this.chromeStorageApi.set(keyedObj, () => {
                resolve()
            })
        })
    }

    async flush(): Promise<void> {
        return new Promise<void>((resolve) => {
            this.chromeStorageApi.remove(STORAGE_KEY, () => {
                resolve()
            })
        })
    }
}

class HtmlStorageService extends AbstractStorageService {
    async load(): Promise<TObject | null> {
        let json = window.sessionStorage.getItem(STORAGE_KEY)

        if (json != null) {
            const obj = JSON.parse(json)
            if (obj != null) {
                return Promise.resolve(obj as TObject)
            }
        }
        return Promise.resolve(null)
    }

    async save(): Promise<void> {
        const json = JSON.stringify(this.state)
        window.sessionStorage.setItem(STORAGE_KEY, json)
        return Promise.resolve()
    }

    async flush(): Promise<void> {
        window.sessionStorage.removeItem(STORAGE_KEY)
        return Promise.resolve()
    }
}

export const storageService = runningAsExtension
    ? new ChromeStorageService
    : new HtmlStorageService
