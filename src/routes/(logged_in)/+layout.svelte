<script lang="ts">
    import ThemeButton from "$lib/components/ThemeButton.svelte";
    import { token, username } from "../../stores/userState";
    import { logout } from "$lib";
    import { page } from "$app/state";
    let { children } = $props();

    if (!$token || !$username) {
        logout();
    }

    const isActive = (path: string): "tab-active" | "" => {
        return page.url.pathname.includes(path) ? "tab-active" : "";
    };
</script>

<nav class="flex py-0 px-4 mb-4 h-16 shadow-sm navbar bg-base-100">
    <div class="navbar-start">
        <div class="dropdown">
            <div
                tabindex="0"
                role="button"
                class="!shadow-none md:hidden btn btn-ghost"
            >
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
        <svg
            class="hidden md:block"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            ><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
                fill="currentColor"
                d="M14 9.9V8.2q.825-.35 1.688-.525T17.5 7.5q.65 0 1.275.1T20 7.85v1.6q-.6-.225-1.213-.337T17.5 9q-.95 0-1.825.238T14 9.9m0 5.5v-1.7q.825-.35 1.688-.525T17.5 13q.65 0 1.275.1t1.225.25v1.6q-.6-.225-1.213-.338T17.5 14.5q-.95 0-1.825.225T14 15.4m0-2.75v-1.7q.825-.35 1.688-.525t1.812-.175q.65 0 1.275.1T20 10.6v1.6q-.6-.225-1.213-.338T17.5 11.75q-.95 0-1.825.238T14 12.65M6.5 16q1.175 0 2.288.263T11 17.05V7.2q-1.025-.6-2.175-.9T6.5 6q-.9 0-1.788.175T3 6.7v9.9q.875-.3 1.738-.45T6.5 16m6.5 1.05q1.1-.525 2.213-.787T17.5 16q.9 0 1.763.15T21 16.6V6.7q-.825-.35-1.713-.525T17.5 6q-1.175 0-2.325.3T13 7.2zM12 20q-1.2-.95-2.6-1.475T6.5 18q-1.05 0-2.062.275T2.5 19.05q-.525.275-1.012-.025T1 18.15V6.1q0-.275.138-.525T1.55 5.2q1.15-.6 2.4-.9T6.5 4q1.45 0 2.838.375T12 5.5q1.275-.75 2.663-1.125T17.5 4q1.3 0 2.55.3t2.4.9q.275.125.413.375T23 6.1v12.05q0 .575-.487.875t-1.013.025q-.925-.5-1.937-.775T17.5 18q-1.5 0-2.9.525T12 20m-5-8.35"
            /></svg
        >
        <!-- <h1 class="text-xl">Cool logo idk</h1> -->
    </div>
    <div
        id="pages"
        class="hidden h-full md:flex tabs tabs-border navbar-center"
    >
        <a href="/mangalist" class={"tab " + isActive("/mangalist")}
            >Manga List</a
        >
        <a href="/search" class={"tab " + isActive("/search")}>Browse</a>
        <a href="/vocab" class={"tab " + isActive("/vocab")}>Vocabulary</a>
    </div>
    <div class="navbar-end">
        <ul class="px-1 menu menu-horizontal">
            <li>
                <details>
                    <summary>{$username}</summary>
                    <ul class="p-2 rounded-lg rounded-t-none bg-base-100">
                        <li><a>Profile</a></li>
                        <li><button onclick={logout}>Logout</button></li>
                    </ul>
                </details>
            </li>
        </ul>
        <ThemeButton></ThemeButton>
    </div>
</nav>

{@render children()}
