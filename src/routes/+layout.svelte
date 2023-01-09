<script lang="ts">
    import '../app.css'
    import { getWdtElement, handleWindowResize, runningAsExtension } from '$lib/util'
    import Nav from '$lib/components/Nav.svelte'
    import { classMap } from '$lib/util'
    import { onMount } from 'svelte'
    import { darkModeEnabled } from '$lib/stores'

    onMount(() => {

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

</script>

<div class={classMap(['wdt flex flex-col m-auto bg-white dark:bg-gray-700',
    {'border dark:border-gray-900 mt-5': !runningAsExtension}
])}>
    <Nav/>
    <slot/>
</div>
