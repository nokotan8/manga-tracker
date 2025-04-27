<script>
    import { goto } from '$app/navigation';
    import { browser } from '$app/environment';
    import ThemeButton from '$lib/components/ThemeButton.svelte';
    import { username } from '../../stores/userState';
    import { logout } from '$lib';
    let { children } = $props();

    if (browser && !localStorage.getItem('username')) {
        logout();
    }
</script>

<nav class="shadow-sm navbar bg-base-100">
    <div role="tablist" class="flex-1">
        <a href="/home/all" role="tab" class="tab">All Manga</a>
        <a role="tab" class="tab">Reading</a>
        <a role="tab" class="tab">Finished</a>
    </div>
    <div>
        <ul class="px-1 menu menu-horizontal">
            <li>
                <details>
                    <summary>{$username}</summary>
                    <ul class="p-2 rounded-t-none bg-base-100">
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
