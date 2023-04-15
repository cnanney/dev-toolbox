<script lang="ts">
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()
</script>

<button type="button"
        title="Close"
        class="rounded-md bg-transparent text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200 focus:outline-none"
        on:click={() => dispatch('close')}
>
    <span class="sr-only">Close</span>
    <svg class="h-5 w-5 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
            d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
    </svg>
</button>
