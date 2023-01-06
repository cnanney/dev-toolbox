<script>
    import '../app.css'
    import { focusInput, resizeTypeSelectorIfPresent, runningAsExtension, waitForFonts } from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
    import { afterNavigate } from '$app/navigation'
    import { onMount, tick } from 'svelte'
    import { classMap } from '$lib/util'

    function onLoad() {
        resizeTypeSelectorIfPresent()
        setTimeout(focusInput, 20)
    }

    onMount(() => {
        waitForFonts().then(onLoad)
        console.log('onMount')
    })

    afterNavigate(() => {
        tick().then(onLoad)
        console.log('afterNavigate')
    })
</script>

<div class={classMap(['wdt flex flex-col m-auto bg-white dark:bg-gray-700',
    {'border dark:border-gray-900 mt-5': !runningAsExtension}
])}>
    <Nav/>
    <slot/>
</div>
