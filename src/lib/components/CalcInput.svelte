<script lang="ts">
    import CalcInputTypeSelector from '$lib/components/CalcInputTypeSelector.svelte'
    import ClearButton from '$lib/components/ClearButton.svelte'
    import type { InputModifier, InputOption, InputToggle, TNullish } from '$lib/types'
    import { focusInput } from '$lib/util'
    import { onMount } from 'svelte'
    import type { Writable } from 'svelte/store'

    export let inputLabel: string,
        inputValueStore: Writable<string>,
        inputTypeStore: Writable<string> | TNullish = null,
        inputSize: number = 2,
        inputOptions: InputOption[] | TNullish = null,
        inputModifiers: InputModifier[] | TNullish = null,
        inputToggles: InputToggle[] | TNullish = null

    onMount(() => {
        setTimeout(focusInput, 10)
    })
</script>

<div class="wdt-input">
    <div class="px-4 py-3">
        <div class="flex justify-between items-center">

            <div class="flex">
                <label for="wdtInput"
                       class="block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >{inputLabel}</label>
                {#if inputTypeStore && inputOptions}
                    <CalcInputTypeSelector {inputTypeStore} {inputOptions}/>
                {/if}
            </div>
            <div class="flex divide-x space-x-2">
                {#if inputModifiers}
                    <div class="flex space-x-1 text-xs text-blue-800 dark:text-blue-400">
                        {#each inputModifiers as mod}
                            {#if mod.callback}
                                <button class="hover:underline" on:click={mod.callback}
                                >{mod.text}</button>{mod.separator ?? ''}
                            {:else}
                                <span class="text-gray-500 dark:text-gray-300">{mod.text}</span>
                            {/if}
                        {/each}
                    </div>
                {/if}
                {#if inputToggles}
                    {#each inputToggles as tog}
                        <label class="inline-flex items-center text-xs">
                            <input type="checkbox" class="gh-checkbox" bind:checked={tog.checked}
                                   on:change={tog.callback}>
                            <span class="ml-2 text-gray-700 dark:text-gray-300">{tog.text}</span>
                        </label>
                    {/each}
                {/if}
                <ClearButton on:clear {inputValueStore}/>
            </div>
        </div>
        <div class="mt-1">
            <textarea id="wdtInput" bind:value={$inputValueStore} rows={inputSize}></textarea>
        </div>
    </div>
</div>
