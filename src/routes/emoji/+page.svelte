<script lang="ts">
    import allEmojis from '$lib/data/emoji-with-gh.json'
    import {emojiInput} from '$lib/stores'
    import CalcInput from '$lib/components/CalcInput.svelte'
    import Fuse from 'fuse.js'

    const fuseOptions = {
        keys: ['n'],
        shouldSort: false,
        threshold: 0.0,
        ignoreLocation: true,
        useExtendedSearch: true,
    }

    const fuse = new Fuse(allEmojis, fuseOptions)

    $: results = fuse.search($emojiInput).map(r => r.item)

    const inputLabel = 'Emoji Search'
    const inputSize = 1
    const inputValueStore = emojiInput

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputSize,
}}/>

<h1 class="mx-4">Emoji ({results.length})</h1>
<div class="m-4">
    {#each results as emoji}
        <span class="mr-1 mb-1 px-2 py-1 bg-gray-300 text-xs inline-block">{emoji.n}</span>
    {/each}
</div>
