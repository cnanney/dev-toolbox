import { runMigrations } from '$lib/migrations'
import type { TObject } from '$lib/types'
import { dotGet, runningAsExtension } from '$lib/util'

// App data is stored under a single "state" key
export const STORAGE_KEY = 'state'


// Storage service classes inspired by and modified from
// https://github.com/bitwarden/clients/tree/master/apps/browser/src/services

export abstract class AbstractStorageService {
    private _state: TObject = {}

    get state(): TObject {
        return this._state
    }

    set state(value: TObject) {
        this._state = value
    }

    async init(): Promise<void> {
        this.state = (await this.load()) || {}

        return this.migrate()
    }

    get(key?: string, defaultValue?: any): any {
        return dotGet(this.state, key, defaultValue)
    }

    set(key: string, val: any): this {
        this._state[key] = val

        return this
    }

    async migrate(): Promise<void> {
        return runMigrations(this)
    }

    isEmpty(): boolean {
        return Object.keys(this.state).length === 0
    }

    has(key: string): boolean {
        return this.get(key) !== undefined
    }

    abstract load(): Promise<TObject | null>;

    abstract save(): Promise<void>;

    abstract flush(): Promise<void>;
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
        let json = window.localStorage.getItem(STORAGE_KEY)

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
        window.localStorage.setItem(STORAGE_KEY, json)

        return Promise.resolve()
    }

    async flush(): Promise<void> {
        window.localStorage.removeItem(STORAGE_KEY)

        return Promise.resolve()
    }
}

export class MemoryStorageService extends AbstractStorageService {
    async load(): Promise<TObject | null> {
        return Promise.resolve({} as TObject)
    }

    async save(): Promise<void> {
        return Promise.resolve()
    }

    async flush(): Promise<void> {
        return Promise.resolve()
    }
}

export const storageService = runningAsExtension
    ? new ChromeStorageService
    : new HtmlStorageService
