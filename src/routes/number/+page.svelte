<script lang="ts">
    import {number} from '$lib/methods'
    import {numberInput, numberInputType} from '$lib/stores'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import CalcInput from '$lib/components/CalcInput.svelte'
    
    const inputLabel = 'Number in'
    const inputSize = 1
    const inputTypeStore = numberInputType
    const inputValueStore = numberInput
    const inputOptions = [
        {
            value: '10',
            text: 'Decimal'
        },
        {
            value: '2',
            text: 'Binary'
        },
        {
            value: '8',
            text: 'Octal'
        },
        {
            value: '16',
            text: 'Hexadecimal'
        },
    ]
    const preCalc = (value, type) => {
        const bigIntPrefixes = {
            '2': '0b',
            '8': '0o',
            '10': '',
            '16': '0x',
        }
        return (bigIntPrefixes[type] || '') + value
    }
    const outputRows = [
        {
            cols: [
                {title: 'Binary', size: 2, method: number.bin, sendInputType: '2'},
            ],
        },
        {
            cols: [
                {title: 'Octal', size: 1, method: number.oct, sendInputType: '8'},
            ],
        },
        {
            cols: [
                {title: 'Decimal', size: 1, method: number.dec, sendInputType: '10'},
            ],
        },
        {
            cols: [
                {title: 'Hexadecimal', size: 1, method: number.hex, sendInputType: '16'},
            ],
        },
    ]

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore,
    inputSize,
    inputTypeStore,
    inputOptions,
}}/>
<CalcOutput {...{
    outputRows,
    inputValueStore,
    inputTypeStore,
    preCalc,
}}/>
