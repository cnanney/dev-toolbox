<script lang="ts">
    import CalcResult from '$lib/components/CalcResult.svelte'
    import type {PreCalcCallback} from '$lib/types'
    import type {Writable} from 'svelte/store'

    export let outputRows: object[],
        inputValueStore: Writable<string>,
        inputTypeStore: Writable<string> | null = null,
        preCalc: PreCalcCallback | null = null
</script>

<div class="wdt-output pb-4">
    <div class="px-4">
        {#each outputRows as row, i}
            <div class="grid gap-y-2 gap-x-5
                {['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3'][row.cols.length]}
                {outputRows.length > i + 1 ? 'mb-2.5' : ''}
                {row.border ? 'border-b pb-4 border-gray-100 dark:border-gray-600' : ''}"
            >
                {#each row.cols as col}
                    <CalcResult {...{inputValueStore, inputTypeStore, preCalc}} calc={col}/>
                {/each}
            </div>
        {/each}
    </div>
</div>
