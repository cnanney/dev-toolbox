<script lang="ts">
    export let label, inputStore, id
</script>

<div class="wdt-input">
    <div class="px-4 py-3">
        <div class="flex justify-between items-center">
            <label for="{id}" class="block text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</label>
        </div>
        <div class="mt-1">
            <textarea id="{id}" bind:value={$inputStore} rows="2"></textarea>
        </div>
    </div>
</div>
