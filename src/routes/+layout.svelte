<script>
    import '../app.css'
    import { runningAsExtension } from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
    import { classMap } from '$lib/util'

</script>

<div class={classMap(['wdt flex flex-col m-auto bg-white dark:bg-gray-700',
    {'border dark:border-gray-900 mt-5': !runningAsExtension}
])}>
    <Nav/>
    <slot/>
</div>
