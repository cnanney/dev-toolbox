import allEmojiList from '$lib/data/emoji-with-gh.json'
import type { Emoji } from '$lib/types'
import Fuse from 'fuse.js'
import { bench, describe } from 'vitest'
import FuseIndex = Fuse.FuseIndex

describe('test emoji indexing', () => {
    const ghOnlyEmojiList = allEmojiList.filter((el: Emoji) => el.gh.length)
    const fuseOptions = {
        keys: ['n'],
        shouldSort: false,
        threshold: 0.0,
        ignoreLocation: true,
        useExtendedSearch: true,
    }
    let fuse

    bench('with index', () => {
        const allEmojiIndex = Fuse.createIndex(['n'], allEmojiList) as FuseIndex<Emoji>
        const ghOnlyEmojiIndex = Fuse.createIndex(['n'], ghOnlyEmojiList) as FuseIndex<Emoji>
        fuse = new Fuse(
            allEmojiList,
            fuseOptions,
            allEmojiIndex
        )
        // toggles checkbox
        fuse = new Fuse(
            ghOnlyEmojiList,
            fuseOptions,
            ghOnlyEmojiIndex
        )
    })

    bench('without index', () => {
        fuse = new Fuse(
            allEmojiList,
            fuseOptions
        )
        // toggles checkbox
        fuse = new Fuse(
            ghOnlyEmojiList,
            fuseOptions
        )
    })

    // verdict: not worth it
})
