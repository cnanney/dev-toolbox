<script lang="ts">
    import { goto } from '$app/navigation'
    import { base } from '$app/paths'
    import { storageService } from '$lib/storage'
    import { onMount } from 'svelte'

    onMount(() => {
        goto(base + (storageService.get('lastNav') ?? '/hash'))
    })
</script>
