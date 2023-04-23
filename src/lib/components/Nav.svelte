<script lang="ts">
    import { page } from '$app/stores'
    import { getSyncedStore } from '$lib/stores'
    import { createPopoutWindow } from '$lib/util'
    import { urlTo } from '$lib/util.js'
    import External from './icons/External.svelte'
    import Moon from './icons/Moon.svelte'
    import Sun from './icons/Sun.svelte'

    const darkModeEnabled = getSyncedStore('darkModeEnabled', false)

    const nav = [
        {id: 'hash', href: `/hash`, name: 'Hash',},
        {id: 'encode', href: `/encode`, name: 'Encode',},
        {id: 'decode', href: `/decode`, name: 'Decode',},
        {id: 'number', href: `/number`, name: 'Number',},
        {id: 'time', href: `/time`, name: 'Time',},
        {id: 'net', href: `/net`, name: 'Net',},
        {id: 'emoji', href: `/emoji`, name: 'Emoji',},
    ]

    function toggleDarkMode() {
        darkModeEnabled.update(dm => !dm)
    }
</script>

<div>
    <nav class="border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between py-3">
                <div class="flex items-center">
                    <div class="flex text-sm font-semibold space-x-1.5 items-center">
                        {#each nav as route}
                            <a href={urlTo(route.href)} data-sveltekit-preload-data="hover"
                               class="text-gray-900 dark:text-gray-200 rounded-md py-2 px-3
                                {$page.route?.id === route.href
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'}"
                            >{route.name}</a>
                        {/each}
                    </div>
                </div>
                <div class="flex">
                    <div class="flex items-center text-gray-500 dark:text-gray-200">
                        <button on:click={toggleDarkMode} aria-label="Toggle Dark Mode" type="button" class="w-5 h-5"
                                title="Toggle Dark Mode">
                            {#if !$darkModeEnabled}
                                <Moon/>
                            {:else}
                                <Sun/>
                            {/if}
                        </button>
                        <button on:click={createPopoutWindow} type="button" class="w-5 h-5 ml-2" aria-label="Pop Out"
                                title="Pop Out">
                            <External/>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </nav>
</div>
