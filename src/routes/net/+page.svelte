<script lang="ts">
    import CalcInput from '$lib/components/CalcInput.svelte'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import { net } from '$lib/methods'
    import { netInput } from '$lib/stores'
    import type { NetInput, PreCalcCallback } from '$lib/types'
    import { Netmask } from 'netmask'

    const inputLabel = 'IPv4 / CIDR / Decimal'
    const inputSize = 1
    const inputValueStore = netInput

    const preCalc: PreCalcCallback = (value): NetInput => {
        try {
            return new Netmask(value)
        } catch (e) {
            return null
        }
    }

    const outputRows = [
        {
            cols: [
                {title: 'IPv4', size: 1, method: net.dec_ip},
                {title: 'Decimal', size: 1, method: net.ip_dec},
            ],
        },
        {
            border: true,
            cols: [
                {title: 'Binary', size: 1, method: net.ip_bin, send: false},
                {title: 'Hexadecimal', size: 1, method: net.ip_hex, send: false},
            ],
        },
        {
            cols: [
                {title: 'Hosts', size: 1, method: net.hosts, send: false},
                {title: 'Min Host', size: 1, method: net.min_host},
                {title: 'Max Host', size: 1, method: net.max_host},
            ],
        },
        {
            cols: [
                {title: 'Network/Mask', size: 1, method: net.net_mask},
                {title: 'Broadcast', size: 1, method: net.broadcast},
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
    preCalc
}}/>
