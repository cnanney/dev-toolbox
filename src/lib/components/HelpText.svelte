<script lang="ts">
    import CloseButton from '$lib/components/CloseButton.svelte'
    import { classMap } from '$lib/util.js'

    export let title = '', text = '', position = 'bottom', classes = ''
</script>

<div aria-live="assertive"
     class={classMap([
         'pointer-events-none absolute inset-0 flex px-4',
         {
             'items-end': position === 'bottom',
             'items-start': position === 'top',
             'items-center': position === 'center',
         }
     ])}>
    <div class={classMap([
            'pointer-events-auto w-full overflow-hidden shadow-md bg-gray-50 dark:bg-gray-800',
            'border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200', classes
        ])}>
        <div class="py-4 px-5">
            {#if title}
                <div class="flex items-start mb-1.5">
                    <div class="w-0 flex-1">
                        <p class={classMap(['text-sm font-medium text-gray-900 dark:text-gray-100', {'mb-1': !!text}])}>{title}</p>
                    </div>
                    <div class="ml-3 flex flex-shrink-0">
                        <div class="inline-flex">
                            <CloseButton on:close/>
                        </div>
                    </div>
                </div>
                {#if text}
                    <p class="text-sm text-gray-700 dark:text-gray-300">{text}</p>
                {/if}
                <slot></slot>
            {:else}
                <div class="flex items-start">
                    <div class="w-0 flex-1">
                        {#if text}
                            <p class="text-sm text-gray-700 dark:text-gray-300">{text}</p>
                        {/if}
                        <slot></slot>
                    </div>
                    <div class="ml-3 flex flex-shrink-0">
                        <div class="inline-flex">
                            <CloseButton on:close/>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
