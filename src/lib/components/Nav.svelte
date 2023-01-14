<script lang="ts">
    import { page } from '$app/stores'
    import { getSyncedStore } from '$lib/stores'
    import { createPopoutWindow } from '$lib/util'
    import {base} from '$app/paths'

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
                            <a href="{base + route.href}" data-sveltekit-preload-data="off"
                               class="text-gray-900 dark:text-gray-200 rounded-md py-2 px-3
                                {$page.route?.id === route.href
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'}"
                            >{route.name}</a>
                        {/each}
                    </div>
                </div>
                <div class="flex">
                    <div class="flex items-center">
                        <button on:click={toggleDarkMode} aria-label="Toggle Dark Mode" type="button" class="w-5 h-5"
                                title="Toggle Dark Mode">
                            {#if !$darkModeEnabled}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     class="text-gray-500 dark:text-gray-200">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                                </svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     class="text-gray-500 dark:text-gray-200">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                          fill-rule="evenodd" clip-rule="evenodd"></path>
                                </svg>
                            {/if}
                        </button>
                        <button on:click={createPopoutWindow} type="button" class="w-5 h-5 ml-2" aria-label="Pop Out"
                                title="Pop Out">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 class="text-gray-500 dark:text-gray-200">
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                            </svg>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </nav>
</div>
