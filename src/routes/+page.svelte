<script lang="ts">
    import { goto } from '$app/navigation'
    import { storageService } from '$lib/storage'
    import { onMount } from 'svelte'

    onMount(() => goto(storageService.get('lastNav') ?? '/hash'))
</script>
