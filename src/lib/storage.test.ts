import { MemoryStorageService } from '$lib/storage'
import { describe, expect, it } from 'vitest'

describe('storage tests', () => {

    it('checks isEmpty', () => {
        const store = new MemoryStorageService
        expect(store.isEmpty()).toBe(true)
        store.set('foo', 'bar')
        expect(store.isEmpty()).toBe(false)
    })

    it('checks has', () => {
        const store = new MemoryStorageService
        expect(store.has('foo')).toBe(false)
        store.set('foo', {bar: 1})
        expect(store.has('foo.bar')).toBe(true)
    })

})
