<script lang="ts">
    import { afterNavigate } from '$app/navigation'
    import Nav from '$lib/components/Nav.svelte'
    import { storageService } from '$lib/storage'
    import { getSyncedStore } from '$lib/stores'
    import {
        classMap,
        getWdtElement,
        handleWindowResize,
        initInputs,
        runningAsExtension,
        waitForFonts
    } from '$lib/util'
    import { onMount } from 'svelte'
    import '../app.css'

    const darkModeEnabled = getSyncedStore('darkModeEnabled', false)

    onMount(() => {

        waitForFonts().then(initInputs)

        const wdt: Element = getWdtElement()
        const resizeObserver = new ResizeObserver(entries => {
            handleWindowResize(entries.at(0).contentRect)
        })

        resizeObserver.observe(wdt)

        darkModeEnabled.subscribe(dm => {
            if (dm) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        })

        return () => resizeObserver.unobserve(wdt)
    })

    afterNavigate(async (nav) => {
        await storageService.set('lastNav', nav.to.route?.id).save()
    })

</script>

<div class={classMap(['wdt flex flex-col m-auto bg-white dark:bg-gray-700',
    {'border dark:border-gray-900 mt-5': !runningAsExtension}
])}>
    <Nav/>
    <slot/>
</div>
