<script lang="ts">
    let { addMangaModalOpen, lists } = $props();

    let titleEN = $state("");
    let titleJP = $state("");
    let authorEN = $state("");
    let authorJP = $state("");
    let year = $state("");
    let chapters = $state("");
    let volumes = $state("");
    let pubStatus = $state("");
    let readStatus = $state("");
    let genres = $state("");
    let notes = $state("");
    let checkedLists: string[] = $state([]);
    let score = 0;

    const submitManga = (): void => {
        checkedLists = [];
        const customLists = document.querySelectorAll(
            "#custom-lists input[type='checkbox']",
        );
        customLists.forEach((c) => {
            const checkbox = c as HTMLInputElement;
            if (checkbox.checked) {
                checkedLists.push(checkbox.value);
            }
        });

        const scoreRadios = document.querySelectorAll(
            "#manga-rating input[type='radio']",
        );

        scoreRadios.forEach((r) => {
            const radio = r as HTMLInputElement;
            if (radio.checked) {
                score = parseInt(radio.value);
                console.log(score);
            }
        });
    };
</script>

<dialog class={"modal" + (addMangaModalOpen ? " modal-open" : "")}>
    <form
        onsubmit={submitManga}
        class="flex flex-row justify-evenly modal-box md:w-130 lg:w-160 xl:w-220"
    >
        <button
            onclick={() => (addMangaModalOpen = false)}
            class="absolute top-2 left-2 btn btn-sm btn-circle btn-ghost"
            >✕</button
        >
        <div class="flex flex-col gap-y-2">
            <div class="flex flex-row gap-x-8">
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend">&nbsp;Title (EN)</legend>
                    <input type="text" bind:value={titleEN} class="input" />
                </fieldset>
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend">&nbsp;Title (JP)</legend>
                    <input type="text" class="input" bind:value={titleJP} />
                </fieldset>
            </div>
            <div class="flex flex-row gap-x-8">
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend">&nbsp;Author (EN)</legend>
                    <input type="text" class="input" bind:value={authorEN} />
                </fieldset>
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend">&nbsp;Author (JP)</legend>
                    <input type="text" class="input" bind:value={authorJP} />
                </fieldset>
            </div>
            <div class="flex flex-row gap-x-8">
                <fieldset class="fieldset flex-1/3">
                    <legend class="fieldset-legend">&nbsp;Year</legend>
                    <input type="number" class="input" bind:value={year} />
                </fieldset>
                <fieldset class="fieldset flex-1/3">
                    <legend class="fieldset-legend">&nbsp;Chapters</legend>
                    <input
                        type="number"
                        class="input"
                        placeholder="Read/Total, e.g. 3/5"
                        bind:value={chapters}
                    />
                </fieldset>
                <fieldset class="fieldset flex-1/3">
                    <legend class="fieldset-legend">&nbsp;Volumes</legend>
                    <input
                        type="number"
                        class="input"
                        placeholder="Read/Total, e.g. 3/5"
                        bind:value={volumes}
                    />
                </fieldset>
            </div>
            <div class="flex flex-row gap-x-8">
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend"
                        >&nbsp;Publication Status</legend
                    >
                    <select bind:value={pubStatus} class="select">
                        <option selected disabled></option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Finished">Finished</option>
                        <option value="Hiatus">Hiatus</option>
                        <option value="Discontinued">Discontinued</option>
                        <option value="Upcoming">Upcoming</option>
                    </select>
                </fieldset>
                <fieldset class="fieldset flex-1/2">
                    <legend class="fieldset-legend">&nbsp;Reading Status</legend
                    >
                    <select class="select" bind:value={readStatus}>
                        <option selected disabled></option>
                        <option value="Reading">Reading</option>
                        <option value="Completed">Completed</option>
                        <option value="Plan to Read">Plan to Read</option>
                        <option value="Dropped">Dropped</option>
                    </select>
                </fieldset>
            </div>
            <fieldset class="fieldset flex-1/3">
                <legend class="fieldset-legend">&nbsp;Genres</legend>
                <input
                    type="text"
                    bind:value={genres}
                    placeholder={`Separate with "|", e.g. Romance | Comedy`}
                    class="w-full input"
                />
            </fieldset>
            <div class="flex flex-row gap-x-8">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend">&nbsp;Score</legend>
                    <div
                        id="manga-rating"
                        class="pl-0 rating rating-sm rating-half"
                    >
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="rating-hidden"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-1"
                            value="1"
                            aria-label="0.5 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-2"
                            value="2"
                            aria-label="1 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-1"
                            value="3"
                            aria-label="1.5 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-2"
                            value="4"
                            aria-label="2 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-1"
                            value="5"
                            aria-label="2.5 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-2"
                            value="6"
                            aria-label="3 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-1"
                            value="7"
                            aria-label="3.5 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-2"
                            value="8"
                            aria-label="4 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-1"
                            value="9"
                            aria-label="4.5 star"
                        />
                        <input
                            type="radio"
                            name="user-manga-rating"
                            class="mask mask-star-2 mask-half-2"
                            value="10"
                            aria-label="5 star"
                        />
                    </div>
                </fieldset>
                <fieldset class="fieldset grow">
                    <legend class="fieldset-legend">&nbsp;Notes</legend>
                    <textarea
                        bind:value={notes}
                        rows="1"
                        class="w-full min-h-0 textarea"
                    ></textarea>
                </fieldset>
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <fieldset
                id="custom-lists"
                class="overflow-scroll p-4 h-108 fieldset bg-base-100"
            >
                <legend class="fieldset-legend">Custom Lists</legend>
                {#each lists as list}
                    <label class="mb-1 label"
                        ><input
                            type="checkbox"
                            class="checkbox checkbox-sm"
                            value={list}
                        />{list}</label
                    >
                {/each}
            </fieldset>
            <button type="submit" class="btn">Add</button>
        </div>
    </form>
</dialog>
