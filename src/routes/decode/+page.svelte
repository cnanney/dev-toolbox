<script lang="ts">
    import {decode} from '$lib/methods'
    import {decodeInput} from '$lib/stores'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import CalcInput from '$lib/components/CalcInput.svelte'

    const inputLabel = 'Text to Decode'
    const inputRows = 2
    const inputValueStore = decodeInput
    const outputRows = [
        {
            cols: [
                {title: 'URI Decoded', size: 4, method: decode.uri, send: false},
            ],
        },
        {
            cols: [
                {title: 'HTML Decoded', size: 4, method: decode.html, send: false},
            ],
        },
        {
            cols: [
                {title: 'BASE-64 Decoded', size: 4, method: decode.base64, send: false},
            ],
        },
    ]

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputRows,
}}/>
<CalcOutput {...{
    outputRows,
    inputValueStore,
}}/>
