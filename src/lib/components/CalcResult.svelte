<script lang="ts">
    import {isFirefox, runCalc} from '$lib/util'
    import type {CalcResult} from '$lib/types'

    export let output: CalcResult, inputStore

    $: result = runCalc(output.method, $inputStore)

    function sendToInput() {
        inputStore.set(result)
    }
</script>

<div class="segment">
    <div class="flex items-center">
        <div class="text-sm font-semibold text-gray-500 dark:text-gray-300">
            {output.title}
        </div>
        <div class="ml-auto flex text-gray-400 dark:text-gray-400">
            {#if output.send ?? true}
                <div on:click={sendToInput}
                     class="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                     title="Send to input">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M5 11l7-7 7 7M5 19l7-7 7 7"/>
                    </svg>
                </div>
            {/if}
            <div class="ml-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                 title="Copy to clipboard">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                </svg>
            </div>
        </div>
    </div>
    <textarea class={!isFirefox ? 'py-2 px-3' : 'p-2'} rows={output.size} readonly>{result}</textarea>
</div>
