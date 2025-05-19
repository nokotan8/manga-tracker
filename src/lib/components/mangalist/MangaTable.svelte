<script lang="ts">
    import { page } from "$app/state";
    import { API_URL, HEADERS } from "$lib";
    import axios from "axios";
    import { token } from "../../../stores/userState";
    import { addToast } from "$lib/classes/ToastInfo";
    import { listEntries } from "./ListEntries.svelte";
    import UpdateEntryModal from "./UpdateEntryModal.svelte";
    let currList: string = $state("");
    let { toasts = $bindable(), lists } = $props();
    $effect(() => {
        currList = page.params.list || "all";
        listEntriesPromise = getListEntries();
    });

    let entryInfo = $state({
        entryId: "",
        entry: {
            entryId: "",
            mangaId: "",
            titleEN: "",
            titleJP: "",
            chapsRead: 0,
            volsRead: 0,
            readStatus: "",
            score: 0,
            notes: "",
        },
        lists: [],
    });
    let updateEntryModalOpen = $state(false);

    let listEntriesPromise = $state();
    const getListEntries = async () => {
        try {
            const res = await axios.get(
                `http://${API_URL}/mangalist/lists/${currList}`,
                {
                    headers: { ...HEADERS, Authorization: `Bearer ${$token}` },
                },
            );

            while (listEntries.length > 0) {
                listEntries.pop();
            }
            for (const entry of res.data.listEntries) {
                listEntries.push(entry);
            }
            return listEntries;
        } catch (error: any) {
            // if (error.response) {
            //     addToast(
            //         toasts,
            //         error.response.data.errors[0],
            //         "alert alert-error",
            //     );
            // } else {
            //     addToast(toasts, "Something went wrong", "alert alert-error");
            // }
        }
    };

    const getEntryDetails = async (entryId: string) => {
        try {
            const res = await axios.get(
                `http://${API_URL}/mangalist/manga/${entryId}`,
                {
                    headers: { ...HEADERS, Authorization: `Bearer ${$token}` },
                },
            );

            entryInfo = res.data;
            entryInfo.entryId = entryId;

            updateEntryModalOpen = true;
        } catch (error: any) {
            if (error.response) {
                addToast(
                    toasts,
                    error.response.data.errors[0],
                    "alert alert-error",
                );
            } else {
                addToast(
                    toasts,
                    "Error: could not retrieve details",
                    "alert alert-error",
                );
            }
        }
    };
</script>

<div
    class="overflow-x-auto rounded-lg shadow-sm bg-base-200 h-[75vh] w-[90vw] sm: md:w-140 lg:w-200 xl:w-260 2xl:w-320"
>
    <table class="table table-pin-rows">
        <thead>
            <tr>
                <th>Title (JP)</th>
                <th>Title (EN)</th>
                <th class="hidden md:table-cell">Chapters</th>
                <th class="hidden md:table-cell">Volumes</th>
                <th class="hidden md:table-cell">Pub. Status</th>
            </tr>
        </thead>
        <tbody>
            {#await listEntriesPromise}
                <tr>
                    <th>Loading...</th>
                </tr>
            {:then}
                {#each listEntries as entry}
                    <tr
                        class="hover:bg-base-300"
                        onclick={() => getEntryDetails(entry.entryId)}
                    >
                        <th>{entry.titleJP}</th>
                        <th>{entry.titleEN || ""}</th>
                        <th class="hidden md:table-cell"
                            >{`${entry.chapsRead || "-"}/${entry.chaps || "-"}`}</th
                        >
                        <th class="hidden md:table-cell"
                            >{`${entry.volsRead || "-"}/${entry.vols || "-"}`}</th
                        >
                        <th class="hidden md:table-cell">{entry.pubStatus}</th>
                    </tr>
                {/each}
            {/await}
        </tbody>
    </table>
</div>
<UpdateEntryModal
    {lists}
    {entryInfo}
    bind:updateEntryModalOpen
    pageToasts={toasts}
></UpdateEntryModal>
