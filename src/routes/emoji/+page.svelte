<script lang="ts">
  import { beforeNavigate } from '$app/navigation'
  import CalcInput from '$lib/components/CalcInput.svelte'
  import EmojiCell from '$lib/components/EmojiCell.svelte'
  import EmojiModal from '$lib/components/EmojiModal.svelte'
  import HelpText from '$lib/components/HelpText.svelte'
  import InlineCode from '$lib/components/InlineCode.svelte'
  import allEmojiList from '$lib/data/emoji-with-gh.json'
  import { getSyncedStore } from '$lib/stores'
  import type { Emoji, InputToggle, InputTrigger } from '$lib/types'
  import { chunkify, focusInput, scrollToTopById } from '$lib/util'
  import { compileSearchTokens } from '$lib/util/emoji'
  import Fuse from 'fuse.js'
  import throttle from 'lodash-es/throttle'
  import { onMount } from 'svelte'

  const emojiInput = getSyncedStore('emojiInput', '')
  const emojiGhOnly = getSyncedStore('emojiGhOnly', false)

  let searchDataset: Emoji[],
    foundEmoji: Emoji[] = [],
    visibleEmoji: Emoji[] = [],
    resultChunks: Emoji[][] = [],
    chunkIndex: number = 0,
    fuse: Fuse<Emoji>,
    modalVisible: boolean = false,
    modalEmoji: Emoji,
    versionHelpVisible: boolean = false,
    searchHelpVisible: boolean = false

  $: searchTokens = compileSearchTokens($emojiInput)

  const ghOnlyEmojiList = allEmojiList.filter((el: Emoji) => el.gh.length)
  const chunkSize = 50
  const loadOffsetPx = 500 //px
  const fuseOptions = {
    keys: ['n'],
    shouldSort: false,
    threshold: 0.0,
    ignoreLocation: true,
    useExtendedSearch: true,
    includeMatches: true,
  }
  const handleScroll = throttle((e) => {
    const offset =
      e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight)
    if (offset < loadOffsetPx && chunkIndex + 1 < resultChunks.length) {
      visibleEmoji = [...visibleEmoji, ...resultChunks[++chunkIndex]]
    }
  }, 50)

  function initDataset() {
    searchDataset = $emojiGhOnly ? ghOnlyEmojiList : allEmojiList
    fuse = new Fuse(searchDataset, fuseOptions)
    doSearch()
  }

  function doSearch() {
    modalVisible = false
    foundEmoji = $emojiInput
      ? fuse
          .search($emojiInput)
          .map((r) => ({ ...r.item, fi: r.matches?.at(0)?.indices ?? [] }))
      : searchDataset
    resultChunks = [...chunkify(foundEmoji, chunkSize)]
    visibleEmoji = resultChunks.length
      ? [...resultChunks[(chunkIndex = 0)]]
      : []
    scrollToTopById('emojis')
  }

  function openModal(e: CustomEvent) {
    modalEmoji = e.detail.emoji
    modalVisible = true
  }

  function closeModal() {
    modalVisible = false
    focusInput()
  }

  const inputLabel = 'Emoji Search'
  const inputSize = 1
  const inputToggles: InputToggle[] = [
    {
      text: 'GitHub Only',
      checked: $emojiGhOnly,
      callback: () => emojiGhOnly.update((val) => !val),
    },
  ]
  const inputTriggers: InputTrigger[] = [
    {
      html: `<sup>[?]</sup>`,
      title: 'Extended search options',
      callback: () => toggleSearchHelp(),
    },
  ]

  onMount(() => {
    const emojiGhOnlyUnsub = emojiGhOnly.subscribe(() => initDataset())
    const emojiInputUnsub = emojiInput.subscribe(() => doSearch())
    return () => {
      emojiInputUnsub()
      emojiGhOnlyUnsub()
    }
  })

  beforeNavigate((nav) => {
    if (modalVisible) {
      modalVisible = false
      // Back button while modal was open
      if (nav.type === 'popstate') {
        nav.cancel()
        focusInput()
      }
    }
  })

  const toggleHelp = () => (versionHelpVisible = !versionHelpVisible)
  const toggleSearchHelp = () => (searchHelpVisible = !searchHelpVisible)

  function closeEverything() {
    versionHelpVisible = false
    searchHelpVisible = false
    modalVisible = false
    focusInput()
  }
</script>

<svelte:window
  on:keydown={({ key }) => key === 'Escape' && closeEverything()}
/>

<CalcInput
  on:clear={doSearch}
  {...{
    inputLabel,
    inputValueStore: emojiInput,
    inputSize,
    inputToggles,
    inputTriggers,
  }}
/>

<div class="wdt-output pt-1">
  <div class="flex flex-col relative">
    <div class="relative">
      <div
        id="emojis"
        on:scroll={handleScroll}
        class="relative px-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-500 overflow-y-auto"
      >
        <div class="pb-3 grid grid-cols-3 gap-3 justify-items-stretch">
          {#each visibleEmoji as emoji (emoji.n)}
            <EmojiCell {emoji} {searchTokens} on:showEmoji={openModal} />
          {/each}
        </div>
      </div>
      {#if searchHelpVisible}
        <HelpText
          title="Extended search options"
          position="top"
          on:close={toggleSearchHelp}
        >
          <p class="text-vs">
            White space acts as an AND operator, while a single <InlineCode
              >|</InlineCode
            >
            character acts as an OR operator. Use double quotes to escape white space,
            e.g.
            <InlineCode>"red hair"</InlineCode>.
          </p>
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Match type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><InlineCode>grin</InlineCode></td>
                <td>fuzzy-match</td>
                <td>Items that fuzzy match <InlineCode>grin</InlineCode></td>
              </tr>
              <tr>
                <td><InlineCode>=bat</InlineCode></td>
                <td>exact-match</td>
                <td>Items that are <InlineCode>bat</InlineCode></td>
              </tr>
              <tr>
                <td><InlineCode>!face</InlineCode></td>
                <td>inverse-exact-match</td>
                <td>Items that do not include <InlineCode>face</InlineCode></td>
              </tr>
              <tr>
                <td><InlineCode>^smile</InlineCode></td>
                <td>prefix-exact-match</td>
                <td>Items that start with <InlineCode>smile</InlineCode></td>
              </tr>
              <tr>
                <td><InlineCode>!^family</InlineCode></td>
                <td>inverse-prefix-exact-match</td>
                <td
                  >Items that do not start with <InlineCode>family</InlineCode
                  ></td
                >
              </tr>
              <tr>
                <td><InlineCode>hand$</InlineCode></td>
                <td>suffix-exact-match</td>
                <td>Items that end with <InlineCode>hand</InlineCode></td>
              </tr>
              <tr>
                <td><InlineCode>!tone$</InlineCode></td>
                <td>inverse-suffix-exact-match</td>
                <td>Items that do not end with <InlineCode>tone</InlineCode></td
                >
              </tr>
            </tbody>
          </table>
        </HelpText>
      {/if}
      {#if versionHelpVisible}
        <HelpText
          title="Emoji v15.0 support is limited"
          position="bottom"
          classes="mb-3"
          on:close={toggleHelp}
        >
          <p class="text-vs text-gray-700 dark:text-gray-300">
            If you see one or more "&#9647" (or other garbled characters) when
            viewing emoji details, that means your OS/browser emoji font does
            not yet natively support that character.
          </p>
        </HelpText>
      {/if}
    </div>
    <div
      class="e-f flex bg-gray-50 dark:bg-gray-800 dark:text-gray-400 py-1.5 px-3 text-xs justify-between shadow-inner"
    >
      <span
        >Emoji v15.0, Fully-Qualified
        <button title="Emoji support information" on:click={toggleHelp}
          ><sup>[?]</sup></button
        >
      </span>
      <span>{'Count: ' + Intl.NumberFormat()['format'](foundEmoji.length)}</span
      >
    </div>
  </div>
  {#if modalVisible}
    <EmojiModal emoji={modalEmoji} on:close={closeModal} />
  {/if}
</div>

<style>
  table {
    @apply mt-3 table-auto border-collapse w-full border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-xs shadow-sm;
  }

  thead {
    @apply bg-slate-50 dark:bg-slate-700;
  }

  td {
    @apply border border-gray-300 dark:border-gray-700 p-1.5 text-gray-700 dark:text-gray-300;
  }

  th {
    @apply border border-slate-300 dark:border-slate-600 font-semibold p-1 text-slate-900 dark:text-slate-200 text-left;
  }
</style>
