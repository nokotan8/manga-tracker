<script lang="ts">
    import { page } from "$app/state";
    import { testMangas } from "$lib/classes/Manga";
    import ListFilter from "$lib/components/mangalist/ListFilter.svelte";
    const lists = $state(["List 1", "List 2", "List 3"]);

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
</script>

<div class="flex flex-col justify-center items-center py-10 px-25">
    <div class="max-w-600">
        <div class="flex flex-row justify-between">
            <button class="btn btn-neutral">
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
        <div class="flex flex-row gap-5 justify-start pt-5">
            <ListFilter {lists} {currList}></ListFilter>
            <div class="overflow-x-auto rounded-xl bg-base-200">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Title (EN)</th>
                            <th>Title (JP)</th>
                            <th>Chapters</th>
                            <th>Volumes</th>
                            <th>Lists</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each dispMangas as manga}
                            <tr class="hover:bg-base-300">
                                <th>{manga.nameEN}</th>
                                <th>{manga.nameJP || ""}</th>
                                <th>{`${manga.currChaps}/${manga.numChaps}`}</th
                                >
                                <th>{`${manga.currVols}/${manga.numVols}`}</th>
                                {#if manga.lists.length < 3}
                                    <th>
                                        {manga.lists[0] +
                                            (manga.lists[1]
                                                ? ", " + manga.lists[1]
                                                : "")}
                                    </th>
                                {:else}
                                    <th>
                                        {manga.lists[0] +
                                            (manga.lists[1]
                                                ? ", " + manga.lists[1]
                                                : "")},&nbsp;<span
                                            class="text-neutral-content/60"
                                        >
                                            ...</span
                                        >
                                    </th>
                                {/if}
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
