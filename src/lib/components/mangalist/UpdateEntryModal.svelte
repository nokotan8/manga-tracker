<script lang="ts">
    import type { ToastInfo } from "$lib/classes/ToastInfo";
    import ToastStack from "../ToastStack.svelte";
    let {
        lists,
        entryInfo,
        updateEntryModalOpen = $bindable(),
        pageToasts = $bindable(),
    } = $props();

    const handleKeyDown = (k: KeyboardEvent): void => {
        if (k.key === "Escape") {
            updateEntryModalOpen = false;
        }
    };

    // Array from 1-10
    let scores = Array.from({ length: 10 }, (_, i) => i + 1);
    let toasts: ToastInfo[] = $state([]);

    let chapsRead = $derived(entryInfo.entry.chapsRead);
    let volsRead = $derived(entryInfo.entry.volsRead);
    let readStatus = $derived(entryInfo.entry.readStatus);
    let score = $derived(entryInfo.entry.score);
    let notes = $derived(entryInfo.entry.notes);
    let inLists = $derived(entryInfo.lists);

    $effect(() => {
        const scoreRadios = document.querySelectorAll(
            "#manga-rating input[type='radio']",
        );
        scoreRadios.forEach((r) => {
            const radio = r as HTMLInputElement;
            if (parseInt(radio.value) === score) {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });

        const customLists = document.querySelectorAll(
            "#custom-lists input[type='checkbox']",
        );
        $inspect(inLists);
        customLists.forEach((c) => {
            const checkbox = c as HTMLInputElement;
            checkbox.checked = false;
            if (inLists.includes(checkbox.dataset.id)) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        });
    });
</script>

<svelte:window onkeydown={handleKeyDown} />
<dialog class={"modal" + (updateEntryModalOpen ? " modal-open" : "")}>
    <ToastStack {toasts} position="top-mid"></ToastStack>
    <div class="modal-box md:w-100 lg:w-130 xl:w-180">
        <button
            onclick={() => (updateEntryModalOpen = false)}
            class="absolute top-1 left-1 !shadow-none border-none btn btn-sm btn-circle btn-ghost"
            >✕</button
        >
        <button class="absolute top-3 right-3 btn btn-sm">Manga Details</button>
        <div class="flex justify-center items-center mb-4">
            <div class="gap-y-2 text-center">
                <p class="mb-2 text-2xl font-bold">
                    {entryInfo.entry.titleJP}
                </p>
                <p>
                    {entryInfo.entry.titleEN}
                </p>
            </div>
        </div>
        <form onsubmit={() => {}} class="flex flex-row justify-evenly">
            <div class="flex flex-col gap-y-2 ml-5">
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Chapters Read</legend
                        >
                        <input
                            type="number"
                            class="input"
                            bind:value={chapsRead}
                        />
                    </fieldset>
                    <fieldset class="fieldset flex-1/2">
                        <legend class="fieldset-legend"
                            >&nbsp;Volumes Read</legend
                        >
                        <input
                            type="number"
                            class="input"
                            bind:value={volsRead}
                        />
                    </fieldset>
                </div>
                <div class="flex flex-row gap-x-8">
                    <fieldset class="fieldset flex-3/4">
                        <legend class="fieldset-legend"
                            >&nbsp;Reading Status</legend
                        >
                        <select class="select" bind:value={readStatus}>
                            <option value="reading">Reading</option>
                            <option value="completed">Completed</option>
                            <option value="planned">Plan to Read</option>
                            <option value="dropped">Dropped</option>
                        </select>
                    </fieldset>
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
                </div>
                <div>
                    <fieldset class="w-full fieldset">
                        <legend class="fieldset-legend">&nbsp;Notes</legend>
                        <textarea
                            bind:value={notes}
                            rows="2"
                            class="w-full min-h-0 textarea"
                        ></textarea>
                    </fieldset>
                </div>
                <button class="self-start btn btn-sm">Delete</button>
            </div>
            <div class="flex flex-col gap-y-3 justify-between items-center">
                <fieldset
                    id="custom-lists"
                    class="overflow-auto p-4 h-65 w-30 fieldset bg-base-100"
                >
                    <legend class="fieldset-legend">Custom Lists</legend>
                    {#each lists as list}
                        <label class="mb-1 label"
                            ><input
                                type="checkbox"
                                class="checkbox checkbox-sm"
                                value={list.name}
                                data-id={list.id}
                            />{list.name}</label
                        >
                    {/each}
                </fieldset>
                <button type="submit" class="w-20 btn btn-sm">Update</button>
            </div>
            <div class="flex flex-col gap-y-2"></div>
        </form>
    </div>
</dialog>
