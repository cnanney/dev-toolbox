<script>
    import '../app.css'
    import {resizeTypeSelectorIfPresent, runningAsExtension, waitForFonts} from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
    import {afterNavigate} from '$app/navigation'

    import {onMount} from 'svelte'

    onMount(() => {
        waitForFonts().then(resizeTypeSelectorIfPresent)
        console.log('onMount')
    })

    afterNavigate(() => {
        resizeTypeSelectorIfPresent()
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
