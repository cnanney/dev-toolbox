<script lang="ts">
    import allEmojiList from '$lib/data/emoji-with-gh.json'
    import { emojiInput, emojiGhOnly } from '$lib/stores'
    import CalcInput from '$lib/components/CalcInput.svelte'
    import Fuse from 'fuse.js'
    import EmojiCell from '$lib/components/EmojiCell.svelte'
    import throttle from 'lodash-es/throttle'
    import type { Emoji } from '$lib/types'
    import { chunkify, scrollToTopById } from '$lib/util'
    import { onMount } from 'svelte'
    import EmojiModal from '$lib/components/EmojiModal.svelte'

    let dataset: Emoji[],
        searchResults: Emoji[],
        resultChunks: [Emoji[]],
        resultSet: Emoji[] = [],
        visibleEmoji: Emoji[] = [],
        chunkIndex: number = 0,
        fuse: Fuse<Emoji>,
        showModal: boolean = false,
        modalEmoji: Emoji

    const ghOnlyEmojiList = allEmojiList.filter((el: Emoji) => el.gh.length)
    const chunkSize = 50
    const loadOffsetPx = 400 //px
    const fuseOptions = {
        keys: ['n'],
        shouldSort: false,
        threshold: 0.0,
        ignoreLocation: true,
        useExtendedSearch: true,
    }
    const handleScroll = throttle((e) => {
        if (
            e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight) < loadOffsetPx
            && chunkIndex + 1 < resultChunks.length
        ) {
            visibleEmoji = [...visibleEmoji, ...resultChunks[++chunkIndex]]
        }
    }, 50)

    function initDataset() {
        dataset = $emojiGhOnly ? ghOnlyEmojiList : allEmojiList
        fuse = new Fuse(dataset, fuseOptions)
        doSearch()
    }

    function doSearch() {
        showModal = false
        searchResults = fuse.search($emojiInput).map(r => r.item)
        resultSet = $emojiInput ? searchResults : dataset
        resultChunks = [...chunkify(resultSet, chunkSize)] as [Emoji[]]
        visibleEmoji = resultChunks.length ? [...resultChunks[chunkIndex = 0]] : []
        scrollToTopById('emojis')
    }

    onMount(() => {
        initDataset()
        const emojiGhOnlyUnsub = emojiGhOnly.subscribe(() => initDataset())
        const emojiInputUnsub = emojiInput.subscribe(() => doSearch())
        return () => {
            emojiInputUnsub()
            emojiGhOnlyUnsub()
        }
    })

    const inputLabel = 'Emoji Search'
    const inputSize = 1
    const inputValueStore = emojiInput
    const inputToggles = [
        {
            text: 'GitHub Only',
            checked: $emojiGhOnly,
            callback: () => emojiGhOnly.update(val => !val),
        },
    ]

    function openModal(e: CustomEvent) {
        modalEmoji = e.detail.emoji
        showModal = true
    }
    
    function closeModal(e: CustomEvent) {
        showModal = false
    }
</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputSize,
    inputToggles
}}/>

<div class="wdt-output">
    <div class="flex flex-col">
        <div id="emojis"
             on:scroll|passive={handleScroll}
             class="px-4 mt-1 scrollbar scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 overflow-y-auto">
            <div class="pb-3 grid grid-cols-3 gap-3 justify-items-stretch">
                {#each visibleEmoji as emoji (emoji.n)}
                    <EmojiCell {emoji} on:showEmoji={openModal}/>
                {/each}
            </div>
        </div>
        <div class="e-f flex bg-gray-50 dark:bg-gray-800 dark:text-gray-400 py-1.5 px-3 text-xs justify-between shadow-inner">
            <span>Emoji v13.1, Fully-Qualified</span>
            <span>{'Count: ' + Intl.NumberFormat()['format'](resultSet.length)}</span>
        </div>
    </div>
    {#if showModal}
        <EmojiModal emoji={modalEmoji} on:close={closeModal}/>
    {/if}
</div>
