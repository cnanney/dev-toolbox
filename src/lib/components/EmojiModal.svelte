<script lang="ts">
    import CloseButton from '$lib/components/CloseButton.svelte'
    import SecondaryButton from '$lib/components/SecondaryButton.svelte'
    import categories from '$lib/data/emoji-category-map.json'
    import type { Emoji } from '$lib/types'
    import { hasClipboardItem } from '$lib/util.js'
    import { emojiDisplayHtmlChars, emojiGhCodes, emojiHtmlChars, emojiPngPath } from '$lib/util/emoji'
    import { createEventDispatcher } from 'svelte'
    import { fade } from 'svelte/transition'

    const dispatch = createEventDispatcher()

    export let emoji: Emoji

    $: categoryName = categories.groups[emoji.g]
    $: subCategoryName = categories.subgroups[emoji.sg]

    function getEmojiChar() {
        return String.fromCodePoint(...emoji.qc.map(c => parseInt(c, 16)))
    }

    function copyChar() {
        navigator.clipboard.writeText(getEmojiChar())
    }

    function copyImg() {
        fetch(emojiPngPath(emoji)).then(response => {
            navigator.clipboard.write([new ClipboardItem({'image/png': response.blob()})])
        })
    }

    function copyHtml() {
        navigator.clipboard.writeText(emojiHtmlChars(emoji))
    }

    function copyGithub() {
        navigator.clipboard.writeText(`:${emoji.gh[0]}:`)
    }

</script>

<div class="absolute bg-white dark:bg-gray-700 inset-0 align-middle px-4" out:fade={{duration: 200}}>
    <div class="relative h-full"
         role="dialog"
         aria-labelledby="modalTitle"
         aria-describedby="modalDescription"
    >
        <div class="absolute top-0 right-0">
            <CloseButton on:close />
        </div>

        <div class="p-4 pb-6 flex flex-col text-center justify-between h-full">

            <div>
                <p class="text-center text-2xl dark:text-gray-200 px-4" id="modalDescription">
                    {emoji.n}
                </p>
                <p class="mt-2 text-center uppercase text-xs font-light text-gray-500 dark:text-gray-400">
                    {categoryName} &blacktriangleright; {subCategoryName}
                </p>
            </div>

            <div class="grid grid-cols-2 text-gray-800 dark:text-gray-200 content-center">
                <img class="w-max mx-auto" src={emojiPngPath(emoji)} title="Google PNG" alt="Google PNG">
                <div><span class="text-6xl" title="Your Browser">{@html emojiHtmlChars(emoji)}</span></div>
                <div class="uppercase text-sm mt-2">Image</div>
                <div class="uppercase text-sm mt-2">Browser</div>

            </div>

            <div>
                <h3 class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Codepoint{ emoji.qc.length !== 1 ? 's' : '' }
                </h3>
                <p class="font-mono text-xs flex dark:text-gray-200 space-x-3 justify-center">
                    {@html emojiDisplayHtmlChars(emoji)}
                </p>
            </div>

            {#if emoji.gh.length}
                <div>
                    <h3 class="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        GitHub shortcode{ emoji.gh.length !== 1 ? 's' : '' }
                    </h3>
                    <p class="font-mono text-xs dark:text-gray-200">{ emojiGhCodes(emoji) }</p>
                </div>
            {/if}

            <div>
                <h3 class="mb-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Copy As</h3>
                <div class="flex justify-center space-x-3 dark:bg-gray-700">
                    <SecondaryButton size="xs" text="Emoji" title="Character" on:click={copyChar}/>
                    {#if hasClipboardItem}
                        <SecondaryButton size="xs" text="PNG" title="Google PNG" on:click={copyImg}/>
                    {/if}
                    <SecondaryButton size="xs" text="HTML" title="HTML encoded" on:click={copyHtml}/>
                    {#if emoji.gh.length}
                        <SecondaryButton size="xs" text="GitHub" title="GitHub shortcode" on:click={copyGithub}/>
                    {/if}
                </div>
            </div>

        </div>


    </div>
</div>
