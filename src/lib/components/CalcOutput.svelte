<script lang="ts">
    import {isFirefox} from '$lib/util'
    import CalcResult from '$lib/components/CalcResult.svelte'

    export let rows, inputStore
</script>

<div class="wdt-output {isFirefox ? 'pb-4' : 'pb-3'}">
    <div class="px-4">
        {#each rows as row, i}
            <div class="grid gap-y-2 gap-x-5
                {['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3'][row.cols.length]}
                {rows.length > i + 1 && 'mb-1'}
                {row.border && 'border-b pb-3 mb-3 border-gray-100 dark:border-gray-600'}"
            >
                {#each row.cols as col}
                    <CalcResult {inputStore} output={col}/>
                {/each}
            </div>
        {/each}
    </div>
</div>
