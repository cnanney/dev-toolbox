<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import Nav from '$lib/components/Nav.svelte'
  import { storageService } from '$lib/storage'
  import { getSyncedStore } from '$lib/stores'
  import {
    getWdtElement,
    handleWindowResize,
    runningAsExtension,
    urlTo,
  } from '$lib/util'
  import { onMount } from 'svelte'
  import { clsx } from 'clsx'
  import '../app.css'

  const ghUrl = 'https://github.com/cnanney/dev-toolbox'
  const darkModeEnabled = getSyncedStore('darkModeEnabled', false)

  let showFooter = false,
    isLoaded = false

  onMount(() => {
    const wdt: Element = getWdtElement()
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        handleWindowResize(entries?.at(0)?.contentRect)
      }
    )

    resizeObserver.observe(wdt)

    darkModeEnabled.subscribe((dm) => {
      if (dm) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    })

    showFooter = !runningAsExtension
    isLoaded = true

    return () => resizeObserver.unobserve(wdt)
  })

  afterNavigate(async (nav) => {
    await storageService.set('lastRoute', nav.to?.route?.id).save()
  })
</script>

<svelte:head>
  <link
    rel="icon"
    type="image/png"
    sizes="24x24"
    href={urlTo('/favicon.png')}
  />
</svelte:head>

<div
  class={clsx([
    'wdt flex flex-col m-auto bg-white dark:bg-gray-700',
    {
      'border dark:border-gray-900 mt-5': !runningAsExtension,
      hidden: !isLoaded,
    },
  ])}
>
  <Nav />
  <slot />
</div>

<p class={clsx(['text-center mt-4', { hidden: !showFooter }])}>
  <a
    href={ghUrl}
    class="font-light text-sm text-gray-700 dark:text-gray-300 hover:underline"
    >{ghUrl}</a
  >
</p>
