<script lang="ts">
  import CalcInput from '$lib/components/CalcInput.svelte'
  import CalcOutput from '$lib/components/CalcOutput.svelte'
  import { encode } from '$lib/methods'
  import { getSyncedStore } from '$lib/stores.js'
  import type { CalcRow } from '$lib/types'

  const inputLabel = 'Text to Encode'
  const inputSize = 2
  const inputValueStore = getSyncedStore('encodeInput', '')
  const outputRows: CalcRow[] = [
    {
      cols: [
        { title: 'URI Encoded', size: 4, method: encode.uri, send: false },
      ],
    },
    {
      cols: [
        { title: 'HTML Encoded', size: 4, method: encode.html, send: false },
      ],
    },
    {
      cols: [
        {
          title: 'BASE-64 Encoded',
          size: 4,
          method: encode.base64,
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
