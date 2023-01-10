<script lang="ts">
    import CalcInput from '$lib/components/CalcInput.svelte'
    import CalcOutput from '$lib/components/CalcOutput.svelte'
    import { time } from '$lib/methods'
    import { getSyncedStore } from '$lib/stores.js'
    import type { PreCalcCallback, TimeInput } from '$lib/types'
    import { DateTime } from 'luxon'
    import { get, type Writable } from 'svelte/store'

    const timeInputType = getSyncedStore('timeInputType') as Writable<string>
    const timeInput = getSyncedStore('timeInput') as Writable<string>

    function adjust(to = null) {
        const currentTime = get(timeInput)
        const currentTimeType = get(timeInputType)

        let now = DateTime.now().toUTC(),
            base = to === null ? now : (preCalc(currentTime, currentTimeType) || now),
            method = currentTimeType.replace('from', 'to'),
            opts = {
                toSQL: {includeOffset: false},
            }

        let val = (to === null
            ? base
            : base.plus({[to]: 1}))[method](opts[method] || {})

        timeInput.set(typeof val === 'string' ? val.replace(/\.000$/, '') : val)
    }

    const inputLabel = 'Time in'
    const inputSize = 1
    const inputOptions = [
        {
            value: 'fromSeconds',
            text: 'Unix (Seconds)'
        },
        {
            value: 'fromMillis',
            text: 'Unix (Milliseconds)'
        },
        {
            value: 'fromISO',
            text: 'ISO 8601'
        },
        {
            value: 'fromSQL',
            text: 'SQL'
        },
        {
            value: 'fromHTTP',
            text: 'HTTP'
        },
    ]

    const inputModifiers = [
        {
            text: 'Now',
            callback: () => adjust(),
            separator: ','
        },
        {
            text: '+1',
            separator: ''
        },
        {
            text: 'sec',
            callback: () => adjust('seconds'),
            separator: ','
        },
        {
            text: 'min',
            callback: () => adjust('minutes'),
            separator: ','
        },
        {
            text: 'hour',
            callback: () => adjust('hours'),
            separator: ','
        },
        {
            text: 'day',
            callback: () => adjust('days'),
            separator: ','
        },
        {
            text: 'month',
            callback: () => adjust('months'),
            separator: ','
        },
        {
            text: 'year',
            callback: () => adjust('years'),
        },
    ]

    const preCalc: PreCalcCallback = (value, type): TimeInput => {
        try {
            let luxonInput = ['fromMillis', 'fromSeconds'].includes(type ?? '')
                ? Number(value)
                : value
            let parsed = DateTime[type](luxonInput, {zone: 'utc'})

            return (!value || parsed.invalid) ? '' : parsed
        } catch (e) {
            return null
        }
    }

    const outputRows = [
        {
            cols: [
                {title: 'Unix (Seconds)', size: 1, method: time.unix_sec, sendInputType: 'fromSeconds'},
                {title: 'Unix (Milliseconds)', size: 1, method: time.unix_milli, sendInputType: 'fromMillis'},
                {title: 'ISO 8601', size: 1, method: time.iso, sendInputType: 'fromISO'},
            ],
        },
        {
            cols: [
                {title: 'ISO Week', size: 1, method: time.iso_week, sendInputType: 'fromISO'},
                {title: 'ISO Date', size: 1, method: time.iso_date, sendInputType: 'fromISO'},
                {title: 'ISO Time', size: 1, method: time.iso_time, sendInputType: 'fromISO'},
            ],
        },
        {
            cols: [
                {title: 'SQL', size: 1, method: time.sql, sendInputType: 'fromSQL'},
                {title: 'HTTP', size: 1, method: time.http, sendInputType: 'fromHTTP'},
            ],
        },
        {
            cols: [
                {title: 'Local (ISO 8601)', size: 1, method: time.local, send: false},
                {title: 'Local (Full)', size: 1, method: time.full, send: false},
            ],
        },
    ]

</script>

<CalcInput {...{
    inputLabel,
    inputValueStore: timeInput,
    inputSize,
    inputTypeStore: timeInputType,
    inputOptions,
    inputModifiers,
}}/>
<CalcOutput {...{
    outputRows,
    inputValueStore: timeInput,
    inputTypeStore: timeInputType,
    preCalc,
}}/>
