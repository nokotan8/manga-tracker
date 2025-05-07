<script lang="ts">
    import { page } from "$app/state";
    import { API_URL, HEADERS } from "$lib";
    import axios from "axios";
    import { token } from "../../../stores/userState";
    import { addToast } from "$lib/classes/ToastInfo";
    import UpdateEntryModal from "./UpdateEntryModal.svelte";
    let currList: string = $state("");
    let { toasts = $bindable(), lists } = $props();
    $effect(() => {
        currList = page.params.list || "all";
        listEntriesPromise = getListEntries();
    });

    let entryInfo = $state({
        entry: {
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

    let listEntries: any[] = $state([]);
    let listEntriesPromise = $state();
    const getListEntries = async () => {
        try {
            const res = await axios.get(
                `http://${API_URL}/mangalist/lists/${currList}`,
                {
                    headers: { ...HEADERS, Authorization: `Bearer ${$token}` },
                },
            );
            listEntries = res.data.listEntries;
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
    class="overflow-x-auto rounded-lg shadow-sm bg-base-200 h-[80vh] md:w-140 lg:w-200 xl:w-260 2xl:w-320"
>
    <table class="table table-pin-rows">
        <thead>
            <tr>
                <th>Title (EN)</th>
                <th>Title (JP)</th>
                <th>Chapters</th>
                <th>Volumes</th>
                <th>Pub. Status</th>
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
                        <th>{entry.titleEN}</th>
                        <th>{entry.titleJP || ""}</th>
                        <th
                            >{`${entry.chapsRead || "-"}/${entry.chaps || "-"}`}</th
                        >
                        <th
                            >{`${entry.volsRead || "-"}/${entry.vols || "-"}`}</th
                        >
                        <th>{entry.pubStatus}</th>
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
