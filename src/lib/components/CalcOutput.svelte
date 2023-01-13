<script lang="ts">
    import CalcResult from '$lib/components/CalcResult.svelte'
    import type { CalcRow, PreCalcCallbackNoType, PreCalcCallbackWithType, TNullish } from '$lib/types'
    import { classMap } from '$lib/util.js'
    import type { Writable } from 'svelte/store'

    export let outputRows: CalcRow[],
        inputValueStore: Writable<string>,
        inputTypeStore: Writable<string> | TNullish = null,
        preCalc: PreCalcCallbackWithType | PreCalcCallbackNoType | TNullish = null
</script>

<div class="wdt-output pb-4">
    <div class="px-4">
        {#each outputRows as row, i}
            <div class={classMap(['grid gap-y-2 gap-x-5',
                ['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3'][row.cols.length],
                {
                    'mb-2.5': outputRows.length > i + 1,
                    'border-b pb-4 border-gray-100 dark:border-gray-600': row.border
                }
            ])}>
                {#each row.cols as col}
                    <CalcResult {...{inputValueStore, inputTypeStore, preCalc}} calc={col}/>
                {/each}
            </div>
        {/each}
    </div>
</div>
