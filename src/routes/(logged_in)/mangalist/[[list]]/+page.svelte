<script lang="ts">
    let { data } = $props();
    const lists = ["List 1", "List 2", "List 3"];

    const listActive = (list: string): "menu-active" | "" => {
        return list === data.list ? "menu-active" : "";
    };
</script>

<div class="flex flex-col justify-start pt-10 px-25">
    <div class="flex flex-row justify-end h-7">
        <button class="btn btn-neutral">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 23">
                <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                <path
                    fill="currentColor"
                    d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"
                />
            </svg>
            Filters & Sort
        </button>
    </div>
    <div class="flex flex-row gap-5 justify-between pt-5">
        <div id="filters" class="flex flex-col flex-none gap-y-3 w-40">
            <div>
                Lists
                <ul class="w-full menu menu-active bg-base-100 rounded-box">
                    <li><a href="/mangalist/" class={listActive("")}>All</a></li>
                    <li><a href="/mangalist/reading" class={listActive("reading")}>Reading</a></li>
                    <li>
                        <a href="/mangalist/completed" class={listActive("completed")}>Completed</a>
                    </li>
                    <li>
                        <details open>
                            <summary>Your Lists</summary>
                            <ul>
                                {#each lists as list}
                                    <li><a href="/mangalist/">{list}</a></li>
                                {/each}
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
            <div>bruh</div>
        </div>
        <div>
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a
            a a a a a a a a a a a a a a a a
        </div>
    </div>
</div>
