<script lang="ts">
  import CalcInput from '$lib/components/CalcInput.svelte'
  import CalcOutput from '$lib/components/CalcOutput.svelte'
  import { decode } from '$lib/methods'
  import { getSyncedStore } from '$lib/stores.js'
  import type { CalcRow } from '$lib/types'

  const inputLabel = 'Text to Decode'
  const inputSize = 2
  const inputValueStore = getSyncedStore('decodeInput', '')
  const outputRows: CalcRow[] = [
    {
      cols: [
        { title: 'URI Decoded', size: 4, method: decode.uri, send: false },
      ],
    },
    {
      cols: [
        { title: 'HTML Decoded', size: 4, method: decode.html, send: false },
      ],
    },
    {
      cols: [
        {
          title: 'BASE-64 Decoded',
          size: 4,
          method: decode.base64,
          send: false,
        },
      ],
    },
  ]
</script>

<CalcInput
  {...{
    inputLabel,
    inputValueStore,
    inputSize,
  }}
/>
<CalcOutput
  {...{
    outputRows,
    inputValueStore,
  }}
/>
