<script>
  import '../app.css';
	import { onNavigate } from '$app/navigation';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	let { children } = $props();

	// View transitions. Only works on Chromium for now
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<ThemeButton></ThemeButton>
{@render children()}

<style>
	::view-transition-new(root) {
		animation-duration: 0.15s;
	}
</style>