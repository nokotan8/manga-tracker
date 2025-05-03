<script lang="ts">
    import type { ToastInfo } from "$lib/classes/ToastInfo";

    interface Props {
        position: "top-mid" | "bot-right";
        toasts: ToastInfo[];
    }
    let { position, toasts }: Props = $props();
    let toastClasses =
        position === "top-mid" ? "toast toast-top toast-center" : "toast";
</script>

<div class="z-100 absolute flex flex-col gap-y-3">
    <div class={toastClasses}>
        {#each toasts as toast}
            <div class={toast.classes}>
                <span>{toast.text}</span>
            </div>
        {/each}
    </div>
</div>
