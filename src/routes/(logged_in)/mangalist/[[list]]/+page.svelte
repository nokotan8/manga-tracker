<script lang="ts">
    import AddMangaModal from "$lib/components/mangalist/AddMangaModal.svelte";
    import ListFilter from "$lib/components/mangalist/ListFilter.svelte";
    import MangaTable from "$lib/components/mangalist/MangaTable.svelte";
    import { addToast, type ToastInfo } from "$lib/classes/ToastInfo";
    import ToastStack from "$lib/components/ToastStack.svelte";
    import axios from "axios";
    import { HEADERS, API_URL } from "$lib";
    import { token } from "../../../../stores/userState";

    let lists = $state([]);
    let listsPromise = $state();
    const getLists = async () => {
        try {
            const res = await axios.get(`http://${API_URL}/mangalist/list`, {
                headers: { ...HEADERS, Authorization: `Bearer ${$token}` },
            });
            lists = res.data.lists;
            return lists;
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
        }
    };
    listsPromise = getLists();

    let addMangaModalOpen: boolean = $state(false);
    let toasts: ToastInfo[] = $state([]);

    const handleKeyDown = (k: KeyboardEvent): void => {
        if (k.key === "Escape") {
            addMangaModalOpen = false;
        }
    };
</script>

<ToastStack position="bot-right" {toasts}></ToastStack>
<svelte:window onkeydown={handleKeyDown} />
<div class="flex flex-col justify-center items-center py-10 px-25">
    <div class="">
        <div class="flex flex-row justify-between">
            <button
                class="btn btn-neutral"
                onclick={() => (addMangaModalOpen = true)}
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
                Add Manga
            </button>
            <button class="btn btn-neutral">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 23"
                >
                    <!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
                    <path
                        fill="currentColor"
                        d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20z"
                    />
                </svg>
                Filter & Sort
            </button>
        </div>
        <div class="flex flex-row gap-5 justify-start pt-2.5">
            <ListFilter bind:lists {listsPromise} bind:toasts></ListFilter>
            <MangaTable bind:toasts></MangaTable>
            <AddMangaModal
                {lists}
                bind:pageToasts={toasts}
                bind:addMangaModalOpen
            ></AddMangaModal>
        </div>
    </div>
</div>
