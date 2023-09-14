<script lang="ts">
  import { goto } from '$app/navigation'
  import { storageService } from '$lib/storage'
  import { urlTo } from '$lib/util'
  import { onMount } from 'svelte'

  onMount(() => {
    goto(urlTo((storageService.get('lastRoute') as string) ?? '/hash'))
  })
</script>
