<script lang="ts">
    import allEmoji from '$lib/data/emoji-with-gh.json'
    import { emojiInput, emojiGhOnly } from '$lib/stores'
    import CalcInput from '$lib/components/CalcInput.svelte'
    import Fuse from 'fuse.js'
    import EmojiCell from '$lib/components/EmojiCell.svelte'
    import throttle from 'lodash-es/throttle'
    import type { Emoji } from '$lib/types'
    import { chunkify } from '$lib/util'

    let dataset: Emoji[],
        searchResults: Emoji[],
        resultChunks: [Emoji[]],
        resultSet: Emoji[],
        visibleEmoji: Emoji[],
        chunkIndex: number = 1,
        fuse: Fuse<Emoji>

    const ghOnlyEmoji = allEmoji.filter((el: Emoji) => el.gh.length)
    const chunkSize = 50
    const fuseOptions = {
        keys: ['n'],
        shouldSort: false,
        threshold: 0.0,
        ignoreLocation: true,
        useExtendedSearch: true,
    }

    $: dataset = $emojiGhOnly ? ghOnlyEmoji : allEmoji
    $: fuse = new Fuse(dataset, fuseOptions)
    $: searchResults = fuse.search($emojiInput).map(r => r.item)
    $: resultSet = $emojiInput ? searchResults : dataset
    $: resultChunks = [...chunkify(resultSet, chunkSize)] as [Emoji[]]
    $: visibleEmoji = [...resultChunks[0]]

    const inputLabel = 'Emoji Search'
    const inputSize = 1
    const inputValueStore = emojiInput

    const handleScroll = throttle((e) => {
        let toEnd = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight)
        if (toEnd < 400) {
            if (chunkIndex < resultChunks.length) {
                visibleEmoji = [...visibleEmoji, ...resultChunks[chunkIndex++]]
            }
        }
    }, 50)

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputSize,
}}/>

<div class="wdt-output">
    <div class="flex flex-col">
        <div id="emojis"
             on:scroll|passive={handleScroll}
             class="px-4 mt-1 scrollbar scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 overflow-y-auto">
            <div class="pb-3 grid grid-cols-3 gap-3 justify-items-stretch">
                {#each visibleEmoji as emoji (emoji.n)}
                    <EmojiCell {emoji}/>
                {/each}
            </div>
        </div>

        <div class="e-f flex bg-gray-50 dark:bg-gray-800 dark:text-gray-400 py-1.5 px-3 text-xs justify-between shadow-inner">
            <span>Emoji v13.1, Fully-Qualified</span>
            <span>{'Count: ' + Intl.NumberFormat()['format'](resultSet.length)}</span>
        </div>

    </div>
</div>
