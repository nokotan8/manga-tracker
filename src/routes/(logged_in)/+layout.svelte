<script>
	import ThemeButton from "$lib/components/ThemeButton.svelte";
	import { username } from "../../stores/userState";
	let { children } = $props();
</script>

<nav class='navbar bg-base-100 shadow-sm' >
  <div role='tablist' class='flex-1'>
    <a role='tab' class='tab'>All Manga</a>
    <a role='tab' class='tab'>Reading</a>
    <a role='tab' class='tab'>Finished</a>
  </div>
	<div >
		<ul class='menu menu-horizontal px-1'>
			<li>
				<details>
					<summary>{$username}</summary>
					<ul class="bg-base-100 rounded-t-none p-2">
						<li><a>Profile</a></li>
						<li><a>Logout</a></li>
					</ul>
				</details>		
			</li>
		</ul>
		<ThemeButton></ThemeButton>
	</div>
</nav>

{@render children()}