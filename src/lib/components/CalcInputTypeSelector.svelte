<script lang="ts">
    import type { InputOption } from '$lib/types'
    import { fontsLoaded, resizeTypeSelectorIfPresent } from '$lib/util'
    import { onMount, tick } from 'svelte'
    import type { Writable } from 'svelte/store'

    export let inputTypeStore: Writable<string>,
        inputOptions: InputOption[]

    onMount(async () => {
        await tick()
        await fontsLoaded()
        resizeTypeSelectorIfPresent()
    })
</script>

<select bind:value={$inputTypeStore} on:change={resizeTypeSelectorIfPresent}
        class="input-select mt-0 p-0 pr-6 pl-1 text-sm font-semibold text-gray-700 
        dark:bg-gray-700 dark:text-gray-200 border-0 focus:ring-0 cursor-pointer unloaded"
>
    {#each inputOptions as option}
        <option value={option.value}>{option.text}</option>
    {/each}
</select>
