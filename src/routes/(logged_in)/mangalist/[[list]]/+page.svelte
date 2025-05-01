<script lang="ts">
    import { page } from "$app/state";
    import { testMangas } from "$lib/classes/Manga";
    import ListFilter from "$lib/components/mangalist/ListFilter.svelte";
    import MangaTable from "$lib/components/mangalist/MangaTable.svelte";
    const lists = $state(["List 1", "List 2", "List 3"]);
    let addMangaModalOpen: boolean = $state(true);

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

<svelte:window onkeydown={handleKeyDown} />
<div class="flex flex-col justify-center items-center py-10 px-25">
    <div class="max-w-600">
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
            <ListFilter {lists} {currList}></ListFilter>
            <MangaTable {dispMangas}></MangaTable>
        </div>
        <dialog class={"modal" + (addMangaModalOpen ? " modal-open" : "")}>
            <div class="flex flex-col gap-y-2 modal-box">
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend">&nbsp;Title (EN)</legend
                        >
                        <input type="text" class="input" />
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend">&nbsp;Title (JP)</legend
                        >
                        <input type="text" class="input" />
                    </fieldset>
                </div>
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Author (EN)</legend
                        >
                        <input type="text" class="input" />
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Author (JP)</legend
                        >
                        <input type="text" class="input" />
                    </fieldset>
                </div>
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/3">
                        <legend class="fieldset-legend">&nbsp;Year</legend>
                        <input type="number" class="input flex-1/3" />
                    </fieldset>
                    <fieldset class="fieldset flex-1/3">
                        <legend class="fieldset-legend">&nbsp;Chapters</legend>
                        <input type="number" class="input flex-1/3" />
                    </fieldset>
                    <fieldset class="fieldset flex-1/3">
                        <legend class="fieldset-legend">&nbsp;Volumes</legend>
                        <input type="number" class="input flex-1/3" />
                    </fieldset>
                </div>
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Publication Status</legend
                        >
                        <select class="select">
                            <option selected disabled></option>
                            <option value="">Ongoing</option>
                            <option value="">Finished</option>
                            <option value="">Hiatus</option>
                            <option value="">Discontinued</option>
                            <option value="">Upcoming</option>
                        </select>
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Reading Status</legend
                        >
                        <select class="select">
                            <option selected disabled></option>
                            <option value="">Reading</option>
                            <option value="">Completed</option>
                            <option value="">Plan to Read</option>
                            <option value="">Dropped</option>
                        </select>
                    </fieldset>
                </div>
                <fieldset class="fieldset flex-1/3">
                    <legend class="fieldset-legend">&nbsp;Genres</legend>
                    <input
                        type="text"
                        placeholder={`Separate with "|", e.g. Romance | Comedy`}
                        class="w-full input"
                    />
                </fieldset>
            </div>
        </dialog>
    </div>
</div>
