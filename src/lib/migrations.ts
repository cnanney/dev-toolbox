import { APP_VERSION } from '$lib/constants'
import type { AbstractStorageService } from '$lib/storage'
import type { TObject } from '$lib/types'
import { dotGet } from '$lib/util'

export const isSemverGreater = (a: string, b: string) => {
    return a.localeCompare(b, undefined, {numeric: true}) === 1
}

type Migration = {
    version: string,
    run: (store: AbstractStorageService) => void
}

const migrations: Migration[] = [
    {
        /**
         * In v1.1.0 state was changed to a simpler top-level map
         */
        version: '1.1.0',
        run: (store: AbstractStorageService): void => {
            const map = {
                'inputs.hash': 'hashInput',
                'inputs.encode': 'encodeInput',
                'inputs.decode': 'decodeInput',
                'inputs.number': 'numberInput',
                'inputs.time': 'timeInput',
                'inputs.net': 'netInput',
                'inputs.emoji': 'emojiInput',
                'types.number': 'numberInputType',
                'types.time': 'timeInputType',
                'lastNavClicked': 'lastRoute', // missing leading "/" is ok
                'onlyGithubEmoji': 'emojiGhOnly',
                'darkModeEnabled': 'darkModeEnabled',
            }
            let currentState = store.state,
                newState: TObject = {}
            for (const [oldKey, newKey] of Object.entries(map)) {
                let value = dotGet(currentState, oldKey)
                if (value != null) {
                    newState[newKey] = value
                }
            }
            store.state = newState
        }
    },
]

export function runMigrations(store: AbstractStorageService, toVersion?: string): void {
    const storedVersion = store.get('appVersion', '1.0.0')
    toVersion ??= APP_VERSION
    if (storedVersion === toVersion) return

    if (!store.isEmpty()) {
        let index = migrations.findIndex(m => isSemverGreater(m.version, storedVersion))
        if (index !== -1) {
            for (; index < migrations.length; index++) {
                console.log(`Running migration for ${migrations[index].version}`)
                migrations[index].run(store)
            }
        }
    }

    store.set('appVersion', toVersion)
}
