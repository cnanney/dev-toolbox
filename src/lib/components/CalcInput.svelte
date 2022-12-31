<script lang="ts">
    import ClearButton from '$lib/components/ClearButton.svelte'
    import {resizeTypeSelectorIfPresent} from '$lib/util'
    import type {Writable} from 'svelte/store'

    export let inputLabel: string,
        inputValueStore: Writable<any>,
        inputTypeStore: Writable<any> | null = null,
        inputRows: number = 2,
        inputOptions: object[] | null = null,
        inputModifiers: object[] | null = null
</script>

<div class="wdt-input">
    <div class="px-4 py-3">
        <div class="flex justify-between items-center">

            <div class="flex">
                <label for="wdtInput"
                       class="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >{inputLabel}</label>
                {#if inputOptions}
                    <select bind:value={$inputTypeStore} on:change={resizeTypeSelectorIfPresent}
                            class="input-select mt-0 p-0 pr-6 pl-1 text-sm font-semibold text-gray-700 
                            dark:bg-gray-700 dark:text-gray-200 border-0 focus:ring-0 cursor-pointer">
                        {#each inputOptions as option, i}
                            <option value={option.value}>{option.text}</option>
                        {/each}
                    </select>
                {/if}
            </div>
            <div class="flex divide-x space-x-2">
                {#if inputModifiers}
                    <div class="flex space-x-1 text-xs text-blue-800 dark:text-blue-400">
                        {#each inputModifiers as mod, i}
                            {#if mod.callback}
                                <button class="hover:underline"
                                        on:click={mod.callback}
                                >{mod.text}</button>{mod.separator ?? ''}
                            {:else}
                                <span class="text-gray-500 dark:text-gray-300">{mod.text}</span>
                            {/if}
                        {/each}
                    </div>
                {/if}
                <ClearButton {inputValueStore}/>
            </div>
        </div>
        <div class="mt-1">
            <textarea id="wdtInput" bind:value={$inputValueStore} rows={inputRows} autofocus></textarea>
        </div>
    </div>
</div>