<script>
    import '../app.css'
    import {runningAsExtension} from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
</script>

<div class="wdt flex flex-col m-auto bg-white dark:bg-gray-700
    {!runningAsExtension && 'border dark:border-gray-900 mt-5'}"
>
    <Nav/>
    <slot/>
</div>
