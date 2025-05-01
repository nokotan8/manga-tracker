<script lang="ts">
    let { lists, currList } = $props();

    const listActive = (list: string): "menu-active" | "" => {
        return list === currList ? "menu-active" : "";
    };
</script>

<div id="filters" class="flex flex-col flex-none gap-y-3 mt-3 w-40">
    <div>
        Lists
        <ul class="w-full menu menu-active bg-base-100 rounded-box">
            <li><a href="/mangalist/" class={listActive("")}>All</a></li>
            <li>
                <a href="/mangalist/reading" class={listActive("reading")}
                    >Reading</a
                >
            </li>
            <li>
                <a href="/mangalist/completed" class={listActive("completed")}
                    >Completed</a
                >
            </li>
            <li>
                <a href="/mangalist/planned" class={listActive("planned")}
                    >Plan to Read</a
                >
            </li>
            <li>
                <details open>
                    <summary>Your Lists</summary>
                    <ul>
                        {#each lists as list}
                            <li>
                                <a
                                    href={`/mangalist/${list}`}
                                    class={listActive(list)}>{list}</a
                                >
                            </li>
                        {/each}
                        <li></li>
                    </ul>
                </details>
            </li>
            <button class="w-full btn btn-sm">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 23"
                >
                    <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path
                        fill="currentColor"
                        d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                    />
                </svg>
            </button>
        </ul>
    </div>
</div>
