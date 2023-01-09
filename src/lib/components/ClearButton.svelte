<script lang="ts">
    import { focusInput } from '$lib/util'
    import { createEventDispatcher } from 'svelte'
    import type { Writable } from 'svelte/store'

    export let inputValueStore: Writable<string>

    const dispatch = createEventDispatcher()

    function clearInput() {
        inputValueStore.set('')
        focusInput()
        dispatch('clear')
    }
</script>

<div class="flex pl-2 text-xs text-blue-800 dark:text-blue-400 border-gray-300 dark:border-gray-500">
    <button class="hover:underline" on:click={clearInput}>Clear</button>
</div>
