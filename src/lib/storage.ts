import type { TObject } from '$lib/types'
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

    abstract get(): Promise<TObject | null>;

    abstract save(): Promise<void>;

    abstract flush(): Promise<void>;
}

class ChromeStorageService extends AbstractStorageService {
    protected chromeStorageApi: chrome.storage.StorageArea = chrome.storage.local

    async get(): Promise<TObject | null> {
        return new Promise((resolve) => {
            this.chromeStorageApi.get(STORAGE_KEY, (obj: any) => {
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
        const keyedObj = {[STORAGE_KEY]: this.store}
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
    get(): Promise<TObject | null> {
        let json = window.sessionStorage.getItem(STORAGE_KEY)

        if (json != null) {
            const obj = JSON.parse(json)
            if (obj != null) {
                return Promise.resolve(obj as TObject)
            }
        }
        return Promise.resolve(null)
    }

    save(): Promise<void> {
        const json = JSON.stringify(this.store)
        window.sessionStorage.setItem(STORAGE_KEY, json)
        return Promise.resolve()
    }

    flush(): Promise<void> {
        window.sessionStorage.removeItem(STORAGE_KEY)
        return Promise.resolve()
    }
}

export const storageService = runningAsExtension
    ? new ChromeStorageService
    : new HtmlStorageService
