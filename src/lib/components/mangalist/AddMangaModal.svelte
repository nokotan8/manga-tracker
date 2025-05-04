<script lang="ts">
    import ToastStack from "../ToastStack.svelte";
    import { addToast, type ToastInfo } from "$lib/classes/ToastInfo";
    import axios from "axios";
    import { API_URL, HEADERS, logout } from "$lib";
    import { token } from "../../../stores/userState";

    let { addMangaModalOpen = $bindable(), lists } = $props();

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
    let isPublic = $state(true);

    // Array from 1-10
    let scores = Array.from({ length: 10 }, (_, i) => i + 1);
    let toasts: ToastInfo[] = $state([]);

    const submitManga = async (): Promise<void> => {
        // Lists
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

        // Score from 1-10
        const scoreRadios = document.querySelectorAll(
            "#manga-rating input[type='radio']",
        );
        scoreRadios.forEach((r) => {
            const radio = r as HTMLInputElement;
            if (radio.checked) {
                score = parseInt(radio.value);
            }
        });

        let chapsTotal, chapsRead;
        if (chapters) {
            const chapParts = chapters.split("/");
            chapsTotal =
                chapParts.length > 1
                    ? parseInt(chapParts[1])
                    : parseInt(chapParts[0]);
            chapsRead = chapParts.length > 1 ? parseInt(chapParts[0]) : 0;
            if (chapParts.length > 2 || isNaN(chapsTotal) || isNaN(chapsRead)) {
                addToast(
                    toasts,
                    "Enter chapters in the specified format",
                    "alert alert-error",
                );
                return;
            }
        }

        let volsTotal, volsRead;
        if (volumes) {
            const volParts = volumes.split("/");
            volsTotal =
                volParts.length > 1
                    ? parseInt(volParts[1])
                    : parseInt(volParts[0]);
            volsRead = volParts.length > 1 ? parseInt(volParts[0]) : 0;
            if (volParts.length > 2 || isNaN(volsTotal) || isNaN(volsRead)) {
                addToast(
                    toasts,
                    "Enter volumes in the specified format",
                    "alert alert-error",
                );
                return;
            }
        }

        if (!pubStatus) {
            addToast(
                toasts,
                "Please select a publication status",
                "alert alert-error",
            );
        }
        if (!readStatus) {
            addToast(
                toasts,
                "Please select a reading status",
                "alert alert-error",
            );
        }
        const genresSplit = genres.split("|").map((g) => g.trim());

        try {
            const res = await axios.post(
                `http://${API_URL}/manga`,
                {
                    titleEN: titleEN,
                    titleJP: titleJP,
                    authorEN: authorEN,
                    authorJP: authorJP,
                    year: parseInt(year),
                    chapsTotal: chapsTotal,
                    volsTotal: volsTotal,
                    pubStatus: pubStatus,
                    genres: genresSplit,
                    isPublic: isPublic,
                },
                { headers: { ...HEADERS, Authorization: `Bearer ${$token}` } },
            );

            axios.post(
                `http://${API_URL}/mangalist/manga`,
                {
                    mangaId: res.data.mangaId,
                    chapsRead: chapsRead,
                    chapsTotal: chapsTotal,
                    readStatus: readStatus,
                    score: score,
                    notes: notes,
                },
                { headers: { ...HEADERS, Authorization: `Bearer ${$token}` } },
            );

            for (let list of checkedLists) {
                axios.post(
                    `http://${API_URL}/mangalist/lists/${list}`,
                    { mangaId: res.data.mangaId },
                    {
                        headers: {
                            ...HEADERS,
                            Authorization: `Bearer ${$token}`,
                        },
                    },
                );
            }

            addMangaModalOpen = false;
        } catch (error: any) {
            if (error.response) {
                if (error.response.status && error.response.status === 401) {
                    logout();
                }
                addToast(
                    toasts,
                    error.response.data.errors[0],
                    "alert alert-error",
                );
            } else {
                addToast(toasts, "Something went wrong", "alert alert-error");
            }
            return;
        }
    };
</script>

<dialog class={"modal" + (addMangaModalOpen ? " modal-open" : "")}>
    <ToastStack {toasts} position="top-mid"></ToastStack>
    <div class="modal-box md:w-150 lg:w-180 xl:w-240">
        <button
            onclick={() => (addMangaModalOpen = false)}
            class="absolute top-1 left-1 !shadow-none border-none btn btn-sm btn-circle btn-ghost"
            >✕</button
        >
        <form onsubmit={submitManga} class="flex flex-row justify-evenly">
            <div class="flex flex-col gap-y-2">
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend">&nbsp;Title (EN)</legend
                        >
                        <input type="text" bind:value={titleEN} class="input" />
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend">&nbsp;Title (JP)</legend
                        >
                        <input type="text" class="input" bind:value={titleJP} />
                    </fieldset>
                </div>
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Author (EN)</legend
                        >
                        <input
                            type="text"
                            class="input"
                            bind:value={authorEN}
                        />
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Author (JP)</legend
                        >
                        <input
                            type="text"
                            class="input"
                            bind:value={authorJP}
                        />
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
                            type="text"
                            class="input"
                            placeholder="Read/Total, e.g. 3/5"
                            bind:value={chapters}
                        />
                    </fieldset>
                    <fieldset class="fieldset flex-1/3">
                        <legend class="fieldset-legend">&nbsp;Volumes</legend>
                        <input
                            type="text"
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
                        <legend class="fieldset-legend"
                            >&nbsp;Reading Status</legend
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
                            {#each scores as score}
                                <input
                                    type="radio"
                                    name="user-manga-rating"
                                    class={`mask mask-star-2 ${score % 2 ? "mask-half-1" : "mask-half-2"}`}
                                    value={score}
                                    aria-label={`${score / 2} star`}
                                />
                            {/each}
                        </div>
                    </fieldset>

                    <fieldset class="fieldset bg-base-100">
                        <legend class="fieldset-legend">Public</legend>
                        <label class="label">
                            <input
                                type="checkbox"
                                bind:checked={isPublic}
                                class="toggle"
                            />
                        </label>
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
            <div class="flex flex-col justify-between items-center">
                <fieldset
                    id="custom-lists"
                    class="overflow-auto p-4 h-108 w-30 fieldset bg-base-100"
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
                <button type="submit" class="w-20 btn">Add</button>
            </div>
        </form>
    </div>
</dialog>
