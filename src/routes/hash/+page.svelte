<script lang="ts">
    import {hash} from '$lib/methods'
    import {hashInput} from '$lib/stores'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import CalcInput from '$lib/components/CalcInput.svelte'

    const rows = [
        {
            cols: [
                {
                    title: 'MD5',
                    size: 1,
                    method: hash.md5
                },
                {
                    title: 'RIPEMD-160',
                    size: 1,
                    method: hash.ripemd160
                },
            ],
        },
        {
            cols: [
                {
                    title: 'SHA-1',
                    size: 1,
                    method: hash.sha1
                },
            ],
        },
        {
            cols: [
                {
                    title: 'SHA-256',
                    size: 1,
                    method: hash.sha256
                },
            ],
        },
        {
            cols: [
                {
                    title: 'SHA-512',
                    size: 2,
                    method: hash.sha512
                },
            ],
        },
        {
            cols: [
                {
                    title: 'SHA3-256',
                    size: 1,
                    method: hash.sha3_256
                },
            ],
        },
        {
            cols: [
                {
                    title: 'SHA3-512',
                    size: 2,
                    method: hash.sha3_512
                },
            ],
        },
    ]

</script>

<CalcInput id="hashInput" label="Text to Hash" inputStore={hashInput}/>
<CalcOutput inputStore={hashInput} rows={rows}/>
