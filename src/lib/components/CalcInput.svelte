<script lang="ts">
    import ClearButton from '$lib/components/ClearButton.svelte'
    import {resizeTypeSelectorIfPresent} from '$lib/util'

    export let 
        inputLabel
        , inputValueStore
        , inputRows = 2
        , inputTypeStore = null
        , inputOptions = null
</script>

<div class="wdt-input">
    <div class="px-4 py-3">
        <div class="flex justify-between">
            <div class="flex">
                <label for="wdtInput"
                       class="block text-sm font-semibold text-gray-700 dark:text-gray-200">{inputLabel}</label>
                {#if inputOptions}
                    <select bind:value={$inputTypeStore} on:change={resizeTypeSelectorIfPresent}
                            class="input-select mt-0 p-0 pr-6 pl-1 text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200 border-0 focus:ring-0 cursor-pointer">
                        {#each inputOptions as option, i}
                            <option value={option.value}>{option.text}</option>
                        {/each}
                    </select>
                {/if}
            </div>
            <ClearButton {inputValueStore}/>
        </div>
        <div class="mt-1">
            <textarea id="wdtInput" bind:value={$inputValueStore} rows={inputRows} autofocus></textarea>
        </div>
    </div>
</div>
