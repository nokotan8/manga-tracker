<script lang="ts">
    import { page } from "$app/state";
    import { API_URL, HEADERS } from "$lib";
    import axios from "axios";
    import { token } from "../../../stores/userState";
    import { addToast } from "$lib/classes/ToastInfo";

    let { lists = $bindable(), toasts = $bindable() } = $props();

    let listName = $state("");
    let listFilterOpen = $state(false);

    let currList: string | undefined = $state(undefined);
    $effect(() => {
        currList = page.params.list || "all";
        if (currList === "all") {
            listName = "All";
        } else if (currList === "reading") {
            listName = "Reading";
        } else if (currList === "planned") {
            listName = "Plan to Read";
        } else if (currList === "completed") {
            listName = "Completed";
        } else if (currList === "dropped") {
            listName = "Dropped";
        } else {
            for (const list of lists) {
                if (list.id === currList) {
                    listName = list.name;
                    break;
                }
            }
        }
    });
    let newListName = $state("");

    const addList = async () => {
        if (!newListName) {
            addToast(toasts, "Please enter a list name", "alert alert-error");
            return;
        }
        try {
            const res = await axios.post(
                `http://${API_URL}/mangalist/lists`,
                { name: newListName },
                { headers: { ...HEADERS, Authorization: `Bearer ${$token}` } },
            );

            addToast(
                toasts,
                `List "${newListName}" added`,
                "alert alert-success",
            );

            lists.push({
                name: newListName,
                id: res.data.listId,
            });
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

<button class="mb-3 md:hidden">
    <ul class="w-35 menu bg-base-200 rounded-box">
        <li>
            <details open={listFilterOpen}>
                <summary>{listName}</summary>
                <li><a href="/mangalist/">All</a></li>
                <li>
                    <a href="/mangalist/reading">Reading</a>
                </li>
                <li>
                    <a href="/mangalist/completed">Completed</a>
                </li>
                <li>
                    <a href="/mangalist/planned">Plan to Read</a>
                </li>
                {#each lists as list}
                    <li>
                        <a href={`/mangalist/${list.id}`}>{list.name}</a>
                    </li>
                {/each}
                <li>
                    <a href="/mangalist/dropped">Dropped</a>
                </li>
            </details>
        </li>
    </ul>
</button>
