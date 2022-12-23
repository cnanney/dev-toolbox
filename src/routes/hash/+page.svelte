<script>
    import {isFirefox} from '$lib/util'
    import md5 from 'crypto-js/md5'
    import ripemd160 from 'crypto-js/ripemd160'
    import sha1 from 'crypto-js/sha1'
    import sha256 from 'crypto-js/sha256'
    import sha512 from 'crypto-js/sha512'
    import sha3 from 'crypto-js/sha3'
    
    let value = ''

    const methods = {
        md5: {
            title: 'MD5',
            calc: (input) => md5(input),
        },
        ripemd_160: {
            title: 'RIPEMD-160',
            calc: (input) => ripemd160(input),
        },
        sha_1: {
            title: 'SHA-1',
            calc: (input) => sha1(input),
        },
        sha_256: {
            title: 'SHA-256',
            calc: (input) => sha256(input),
        },
        sha_512: {
            title: 'SHA-512',
            calc: (input) => sha512(input),
        },
        sha3_256: {
            title: 'SHA3-256',
            calc: (input) => sha3(input, {outputLength: 256}),
        },
        sha3_512: {
            title: 'SHA3-512',
            calc: (input) => sha3(input, {outputLength: 512}),
        },
    }

    const rows = [
        {
            cols: [
                {size: 1, method: methods.md5},
                {size: 1, method: methods.ripemd_160},
            ],
        },
        {
            cols: [
                {size: 1, method: methods.sha_1},
            ],
        },
        {
            cols: [
                {size: 1, method: methods.sha_256},
            ],
        },
        {
            cols: [
                {size: 2, method: methods.sha_512},
            ],
        },
        {
            cols: [
                {size: 1, method: methods.sha3_256},
            ],
        },
        {
            cols: [
                {size: 2, method: methods.sha3_512},
            ],
        },
    ]

    const run = (fn, value) => {
        if (!value) return ''

        try {
            return fn(value)
        } catch (e) {
            return ''
        }
    }
</script>

<div class="wdt-input">

    <div class="px-4 py-3">
        <div class="flex justify-between items-center">
            <label class="block text-sm font-semibold text-gray-700 dark:text-gray-200">Text to Hash</label>
        </div>
        <div class="mt-1">
            <textarea bind:value rows="2"></textarea>
        </div>
    </div>

</div>

<div class="wdt-output {isFirefox ? 'pb-4' : 'pb-3'}">
    <div class="px-4">
        {#each rows as row, i}
            <div class="grid gap-y-2 gap-x-5
            {['', 'grid-cols-1', 'grid-cols-2', 'grid-cols-3'][row.cols.length]}
            {rows.length > i+1 ? 'mb-1' : ''}
            {(row.border ?? false) ? 'border-b pb-3 mb-3 border-gray-100 dark:border-gray-600' : ''}">
                {#each row.cols as col, j}
                    <div class="segment">
                        <div class="flex items-center">
                            <div class="text-sm font-semibold text-gray-500 dark:text-gray-300">
                                {col.method.title}
                            </div>
                            <div class="ml-auto flex text-gray-400 dark:text-gray-400">
                                <div class="cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                                     title="Send to input">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none"
                                         viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                              d="M5 11l7-7 7 7M5 19l7-7 7 7"/>
                                    </svg>
                                </div>
                                <div
                                        class="ml-2 cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
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
                        <textarea class="{!isFirefox ? 'py-2 px-3' : 'p-2'}"
                                  data-id="{[i, j].join('-')}"
                                  rows="{col.size}" readonly
                        >{run(col.method.calc, value)}</textarea>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>
