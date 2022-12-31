<script>
    import {page} from '$app/stores'

    const nav = [
        {
            id: 'hash',
            href: '/hash',
            name: 'Hash',
        },
        {
            id: 'encode',
            href: '/encode',
            name: 'Encode',

        },
        {
            id: 'decode',
            href: '/decode',
            name: 'Decode',

        },
        {
            id: 'number',
            href: '/number',
            name: 'Number',

        },
        {
            id: 'time',
            href: '/time',
            name: 'Time',

        },
        {
            id: 'net',
            href: '/net',
            name: 'Net',
        },
        // {
        //     id: 'emoji',
        //     href: '/emoji',
        //     name: 'Emoji',
        // },
    ]
</script>

<div>
    <nav class="border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between py-3">
                <div class="flex items-center">
                    <div class="flex text-sm font-semibold space-x-1.5 items-center">
                        {#each nav as route}
                            <a href="{route.href}" data-sveltekit-preload-data="off"
                               class="text-gray-900 dark:text-gray-200 rounded-md py-2 px-3
                                {$page.route.id === route.href
                                ? 'bg-gray-100 dark:bg-gray-800'
                                : 'hover:bg-gray-50 dark:hover:bg-gray-800'}"
                            >{route.name}</a>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    </nav>
</div>
