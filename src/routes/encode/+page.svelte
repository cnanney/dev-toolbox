<script lang="ts">
    import {encode} from '$lib/methods'
    import {encodeInput} from '$lib/stores'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import CalcInput from '$lib/components/CalcInput.svelte'

    const inputLabel = 'Text to Encode'
    const inputSize = 2
    const inputValueStore = encodeInput
    const outputRows = [
        {
            cols: [
                {title: 'URI Encoded', size: 4, method: encode.uri, send: false},
            ],
        },
        {
            cols: [
                {title: 'HTML Encoded', size: 4, method: encode.html, send: false},
            ],
        },
        {
            cols: [
                {title: 'BASE-64 Encoded', size: 4, method: encode.base64, send: false},
            ],
        },
    ]

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputSize,
}}/>
<CalcOutput {...{
    outputRows,
    inputValueStore,
}}/>
