<script lang="ts">
  import type {
    CalcResult,
    PreCalcCallbackNoType,
    PreCalcCallbackWithType,
    TNullish,
  } from '$lib/types'
  import { resizeTypeSelectorIfPresent } from '$lib/util'
  import { tick } from 'svelte'
  import type { Writable } from 'svelte/store'
  import Clipboard from './icons/Clipboard.svelte'
  import DoubleChevronUp from './icons/DoubleChevronUp.svelte'

  export let calc: CalcResult,
    inputValueStore: Writable<string>,
    inputTypeStore: Writable<any> | TNullish,
    preCalc: PreCalcCallbackWithType | PreCalcCallbackNoType | TNullish

  $: calcInput = preCalc
    ? preCalc($inputValueStore, $inputTypeStore!)
    : $inputValueStore
  $: result = runCalc(calc.method, calcInput)

  function runCalc(fn: (input: any) => string, value: any): string {
    if (!value) return ''
    try {
      return fn(value)
    } catch (e) {
      return ''
    }
  }

  function sendToInput(): void {
    if (calc.sendInputType && inputTypeStore) {
      inputTypeStore.set(calc.sendInputType)
      tick().then(resizeTypeSelectorIfPresent)
    }
    inputValueStore.set(String(result))
  }

  function copyToClipboard(event: Event): void {
    const textarea = (event.target as HTMLElement)
      ?.closest('div.segment')
      ?.querySelector('textarea') as HTMLTextAreaElement
    if (textarea) {
      textarea.select() // for visual feedback
      navigator.clipboard.writeText(textarea.value)
    }
  }
</script>

<div class="segment">
  <div class="flex items-center">
    <div class="text-sm font-semibold text-gray-500 dark:text-gray-300">
      {calc.title}
    </div>
    <div class="ml-auto flex text-gray-400 dark:text-gray-400">
      {#if calc.send ?? true}
        <a
          href={null}
          on:click={sendToInput}
          class="h-3 w-3 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
          title="Send to input"
        >
          <DoubleChevronUp />
        </a>
      {/if}
      <a
        href={null}
        on:click={copyToClipboard}
        class="h-3 w-3 ml-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
        title="Copy to clipboard"
      >
        <Clipboard />
      </a>
    </div>
  </div>
  <textarea rows={calc.size} readonly>{result}</textarea>
</div>
