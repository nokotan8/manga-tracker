<script lang="ts">
    import { page } from "$app/state";
    import { testMangas } from "$lib/classes/Manga";
    let currList: string = $state("");
    $effect(() => {
        currList = page.params.list || "";
    });

    let dispMangas = $state(testMangas);
    $effect(() => {
        if (currList) {
            dispMangas = testMangas.filter((manga) =>
                manga.lists.map((list) => list).includes(currList),
            );
        } else {
            dispMangas = testMangas;
        }
    });
</script>

<div
    class="overflow-x-auto rounded-lg shadow-sm bg-base-200 h-[80vh] md:w-140 lg:w-200 xl:w-260 2xl:w-320"
>
    <table class="table table-pin-rows">
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
                    <th>{manga.titleEN}</th>
                    <th>{manga.titleJP || ""}</th>
                    <th>{`${manga.currChaps}/${manga.numChaps}`}</th>
                    <th>{`${manga.currVols}/${manga.numVols}`}</th>
                    {#if manga.lists.length < 3}
                        <th>
                            {manga.lists[0] +
                                (manga.lists[1] ? ", " + manga.lists[1] : "")}
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
