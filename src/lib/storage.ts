import type { TObject, TNullish } from '$lib/types'
import { runningAsExtension } from '$lib/util'

// Credit to https://github.com/bitwarden/clients/tree/master/apps/browser/src/services

export const STORAGE_KEY = 'wdt'

abstract class AbstractStorageService {
    private _store: TObject = {}

    get store(): TObject {
        return this._store
    }
    
    set store(value: TObject) {
        this._store = value
    }

    async init(): Promise<void> {
        this.store = (await this.get()) || {}
    }

    abstract get<T>(key?: string): Promise<T | null>;

    abstract has(key: string): Promise<boolean>;

    abstract save<T>(key: string, obj: T): Promise<void>;

    abstract remove(key: string): Promise<void>;
}

const resolveGet = (obj: TObject, key: string | TNullish = null) => {
    if (key == null) {
        return obj
    }

    if (obj != null && obj[key] != null) {
        return obj[key]
    }

    return null
}

class ChromeStorageService extends AbstractStorageService {
    protected chromeStorageApi: chrome.storage.StorageArea = chrome.storage.local

    async get<T>(key?: string): Promise<T | null> {
        return new Promise((resolve) => {
            this.chromeStorageApi.get(STORAGE_KEY, (obj: any) => {
                const val = resolveGet(obj[STORAGE_KEY], key)
                if (val != null) {
                    resolve(val as T)
                    return
                }
                resolve(null)
            })
        })
    }

    async has(key: string): Promise<boolean> {
        return (await this.get(key)) != null
    }

    async save(key: string, obj: any): Promise<void> {
        if (obj == null) {
            // Fix safari not liking null in set
            return new Promise<void>((resolve) => {
                this.chromeStorageApi.remove(key, () => {
                    resolve()
                })
            })
        }

        if (obj instanceof Set) {
            obj = Array.from(obj)
        }

        const keyedObj = {[key]: obj}
        return new Promise<void>((resolve) => {
            this.chromeStorageApi.set(keyedObj, () => {
                resolve()
            })
        })
    }

    async remove(key: string): Promise<void> {
        return new Promise<void>((resolve) => {
            this.chromeStorageApi.remove(key, () => {
                resolve()
            })
        })
    }
}

class HtmlStorageService extends AbstractStorageService {
    get<T>(key?: string): Promise<T | null> {
        let json = window.sessionStorage.getItem(STORAGE_KEY)

        if (json != null) {
            const obj = JSON.parse(json)
            const val = resolveGet(obj, key)
            if (val != null) {
                return Promise.resolve(val as T)
            }
        }
        return Promise.resolve(null)
    }

    async has(key: string): Promise<boolean> {
        return (await this.get(key)) != null
    }

    save(key: string, obj: any): Promise<void> {
        if (obj == null) {
            return this.remove(key)
        }

        if (obj instanceof Set) {
            obj = Array.from(obj)
        }

        const json = JSON.stringify(obj)
        window.sessionStorage.setItem(key, json)
        return Promise.resolve()
    }

    remove(key: string): Promise<void> {
        window.sessionStorage.removeItem(key)
        return Promise.resolve()
    }
}

export const storageService = runningAsExtension
    ? new ChromeStorageService
    : new HtmlStorageService
