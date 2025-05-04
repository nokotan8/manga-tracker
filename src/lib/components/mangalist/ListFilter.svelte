<script lang="ts">
    import { API_URL, HEADERS } from "$lib";
    import axios from "axios";
    import { token } from "../../../stores/userState";
    import { addToast } from "$lib/classes/ToastInfo";

    let { lists, currList, toasts = $bindable() } = $props();

    let newListName = $state("");
    const listActive = (list: string): "menu-active" | "" => {
        return list === currList ? "menu-active" : "";
    };

    const addList = async () => {
        if (!newListName) {
            addToast(toasts, "Please enter a list name", "alert alert-error");
            return;
        }
        try {
            const res = await axios.post(
                `http://${API_URL}/mangalist`,
                { name: newListName },
                { headers: { ...HEADERS, Authorization: `Bearer ${$token}` } },
            );

            addToast(
                toasts,
                `List ${newListName} added`,
                "alert alert-success",
            );
        } catch (error: any) {
            if (error.response) {
                addToast(
                    toasts,
                    error.response.data.errors[0],
                    "alert alert-error",
                );
            } else {
                addToast(toasts, "Something went wrong", "alert alert-error");
            }
        } finally {
            newListName = "";
        }
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
                    <ul class="overflow-auto max-h-[50vh]">
                        {#each lists as list}
                            <li>
                                <a
                                    href={`/mangalist/${list.id}`}
                                    class={listActive(list.name)}>{list.name}</a
                                >
                            </li>
                        {/each}
                        <li></li>
                    </ul>
                </details>
            </li>
            <li>
                <a href="/mangalist/dropped" class={listActive("dropped")}
                    >Dropped</a
                >
            </li>
            <div class="dropdown">
                <button
                    class="mt-1 w-full btn btn-sm btn-neutral"
                    aria-label="Add list"
                >
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
                <form
                    onsubmit={addList}
                    class="shadow-sm dropdown-content menu rounded-box bg-base-100"
                >
                    <input
                        type="text"
                        bind:value={newListName}
                        placeholder="List name"
                        class="input"
                    />
                </form>
            </div>
        </ul>
    </div>
</div>
