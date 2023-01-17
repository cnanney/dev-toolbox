import { runMigrations } from '$lib/migrations'
import { MemoryStorageService } from '$lib/storage'
import { describe, expect, it } from 'vitest'

const oldData = {
    inputs: {
        hash: '123',
        encode: '<test>',
        decode: '%3Ctest%3E',
        number: 'a',
        time: '2023-01-16T22:51:39Z',
        net: '192.168.0.1',
        emoji: 'heart'
    },
    types: {
        time: 'fromISO',
        number: '16'
    },
    lastNavClicked: 'hash',
    darkModeEnabled: false,
    onlyGithubEmoji: true,
}

describe('migrations for v1.1.0 format', () => {
    const store = new MemoryStorageService
    const version = '1.1.0'
    store.state = oldData

    runMigrations(store, version)

    it('remaps values', () => {
        expect(store.get('hashInput')).toBe('123')
        expect(store.get('encodeInput')).toBe('<test>')
        expect(store.get('decodeInput')).toBe('%3Ctest%3E')
        expect(store.get('numberInput')).toBe('a')
        expect(store.get('numberInputType')).toBe('16')
        expect(store.get('timeInput')).toBe('2023-01-16T22:51:39Z')
        expect(store.get('timeInputType')).toBe('fromISO')
        expect(store.get('netInput')).toBe('192.168.0.1')
        expect(store.get('emojiInput')).toBe('heart')
        expect(store.get('emojiGhOnly')).toBe(true)
        expect(store.get('lastRoute')).toBe('hash')
        expect(store.get('darkModeEnabled')).toBe(false)
        expect(store.get('appVersion')).toBe(version)
    })
})

describe('migrations skipped if version match', () => {
    const store = new MemoryStorageService
    const version = '1.1.0'
    store.state = oldData
    store.set('appVersion', version)

    runMigrations(store, version) // nothing should happen

    it('leaves values alone', () => {
        expect(store.get('inputs.hash')).toBe('123')
    })

})
