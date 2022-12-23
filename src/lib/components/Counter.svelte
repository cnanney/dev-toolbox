<script lang="ts">
    import {clickCount} from '$lib/stores'

    const increment = () => {
        clickCount.update(count => count + 1)
    }
</script>

<button class="border p-3" on:mousemove={increment}>
    COUNT is {$clickCount}
</button>
