<script>
    import '../app.css'
    import {focusInput, resizeTypeSelectorIfPresent, runningAsExtension, waitForFonts} from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
    import {afterNavigate} from '$app/navigation'
    import {onMount, tick} from 'svelte'

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

<div class="
    wdt flex flex-col m-auto bg-white dark:bg-gray-700
    {!runningAsExtension && 'border dark:border-gray-900 mt-5'}"
>
    <Nav/>
    <slot/>
</div>
