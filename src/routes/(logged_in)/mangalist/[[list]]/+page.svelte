<script lang="ts">
    import { page } from "$app/state";
    import { testMangas } from "$lib/classes/Manga";
    import AddMangaModal from "$lib/components/mangalist/AddMangaModal.svelte";
    import ListFilter from "$lib/components/mangalist/ListFilter.svelte";
    import MangaTable from "$lib/components/mangalist/MangaTable.svelte";
    import type { ToastInfo } from "$lib/classes/ToastInfo";
    import type { List } from "$lib/classes/List";
    import ToastStack from "$lib/components/ToastStack.svelte";

    const exList: List = {
        name: "List 1",
        id: "1",
    };
    const lists = $state([exList]);

    let addMangaModalOpen: boolean = $state(false);
    let toasts: ToastInfo[] = $state([]);

    let currList: string = $state("");
    $effect(() => {
        currList = page.params.list || "";
    });

    let dispMangas = $state(testMangas);

    $effect(() => {
        if (currList) {
            dispMangas = testMangas.filter((manga) =>
                manga.lists
                    .map((list) => list.toLowerCase())
                    .includes(currList.toLowerCase()),
            );
        } else {
            dispMangas = testMangas;
        }
    });

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
            <ListFilter {lists} {currList} bind:toasts></ListFilter>
            <MangaTable {dispMangas}></MangaTable>
            <AddMangaModal {lists} bind:addMangaModalOpen></AddMangaModal>
        </div>
    </div>
</div>
