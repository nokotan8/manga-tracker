<script lang="ts">
    import { browser } from "$app/environment";
    import ThemeButton from "$lib/components/ThemeButton.svelte";
    import { username } from "../../stores/userState";
    import { logout } from "$lib";
    import { page } from "$app/state";
    let { children } = $props();

    if (browser && !localStorage.getItem("username")) {
        // logout();
    }

    const isActive = (path: string): "tab-active" | "" => {
        return page.url.pathname.includes(path) ? "tab-active" : "";
    };
</script>

<nav class="flex py-0 px-4 mb-4 h-16 shadow-sm navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
            <div tabindex="0" role="button" class="md:hidden btn btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    />
                </svg>
            </div>
            <ul
                class="p-2 mt-3 w-52 shadow menu menu-md dropdown-content bg-base-100 rounded-box z-1"
            >
                <li><a href="/mangalist">Manga List</a></li>
                <li><a href="/search"> Browse</a></li>
                <li><a href="/vocab">Vocabulary</a></li>
            </ul>
        </div>
        <h1 class="text-xl">Cool logo idk</h1>
    </div>
    <div id="pages" class="hidden h-full md:flex tabs tabs-border navbar-center">
        <a href="/mangalist" class={"tab " + isActive("/mangalist")}>Manga List</a>
        <a href="/search" class={"tab " + isActive("/search")}>Browse</a>
        <a href="/vocab" class="tab" data-active={isActive("/vocab")}>Vocabulary</a>
    </div>
    <ul class="px-1 navbar-end menu menu-horizontal">
        <li>
            <details>
                <summary>{$username}</summary>
                <ul class="p-2 rounded-t-none bg-base-100">
                    <li><a>Profile</a></li>
                    <li><button onclick={logout}>Logout</button></li>
                </ul>
            </details>
        </li>
    </ul>
    <ThemeButton></ThemeButton>
</nav>

{@render children()}
