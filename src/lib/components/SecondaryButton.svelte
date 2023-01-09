<script lang="ts">
    import { classMap } from '$lib/util'

    export let size: string,
        text: string,
        title: string

    $: classes = sizes[size] || sizes['xs']

    const sizes = {
        xs: 'inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-semibold rounded',
        sm: 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-semibold rounded-md',
        md: 'inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-md',
        lg: 'inline-flex items-center px-4 py-2 border border-transparent text-base font-semibold rounded-md',
        xl: 'inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-md',
    }
</script>

<button type="button"
        on:click
        class={classMap([classes,
            'text-blue-700 dark:text-blue-100 bg-blue-100 hover:bg-blue-200 dark:bg-blue-600 dark:hover:bg-blue-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 dark:focus:ring-offset-gray-700'])}
        title={title}
>
    {text}
</button>
