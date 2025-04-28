<script lang="ts">
    /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
    import ThemeButton from "$lib/components/ThemeButton.svelte";
    let { data, children } = $props();

    let test = 1
</script>

<div class="absolute top-0 right-0 p-3">
    <ThemeButton></ThemeButton>
</div>
{@render children()}
