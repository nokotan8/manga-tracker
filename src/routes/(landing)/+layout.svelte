<script>
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	let { children } = $props();
</script>

<ThemeButton></ThemeButton>
{@render children()}
