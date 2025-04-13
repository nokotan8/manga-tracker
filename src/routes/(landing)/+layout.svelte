<script>
  /** @type {{ data: import('./$types').LayoutData, children: import('svelte').Snippet }} */
  import ThemeButton from '$lib/components/ThemeButton.svelte';
  let { data, children } = $props();
</script>

<div class="absolute top-0 right-0 p-3">
  <ThemeButton></ThemeButton>
</div>
{@render children()}