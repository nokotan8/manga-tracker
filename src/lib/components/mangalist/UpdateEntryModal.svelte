<script lang="ts">
    import type { ToastInfo } from "$lib/classes/ToastInfo";
    import ToastStack from "../ToastStack.svelte";
    let {
        entryInfo,
        updateEntryModalOpen = $bindable(),
        pageToasts = $bindable(),
    } = $props();
    let toasts: ToastInfo[] = $state([]);
</script>

<dialog class={"modal" + (updateEntryModalOpen ? " modal-open" : "")}>
    <ToastStack {toasts} position="top-mid"></ToastStack>
    <div class="modal-box md:w-150 lg:w-180 xl:w-240">
        <button
            onclick={() => (updateEntryModalOpen = false)}
            class="absolute top-1 left-1 !shadow-none border-none btn btn-sm btn-circle btn-ghost"
            >✕</button
        >
    </div>
</dialog>
