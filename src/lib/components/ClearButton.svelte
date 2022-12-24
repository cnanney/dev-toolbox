<script lang="ts">
    import type {Writable} from 'svelte/store'
    import {focusInput} from '$lib/util'

    export let inputStore: Writable<string>

    const clearInput = () => {
        inputStore.set('')
        focusInput()
    }
</script>

<div class="flex pl-2 text-xs text-blue-800 dark:text-blue-400 border-gray-300 dark:border-gray-500">
    <button class="hover:underline" on:click={clearInput}>Clear</button>
</div>
