<script>
    import '../app.css';
    import { onNavigate } from '$app/navigation';
    let { children } = $props();

    // View transitions. Only works on Chromium for now
    // onNavigate((navigation) => {
    //     if (!document.startViewTransition) return;
    //
    //     return new Promise((resolve) => {
    //         document.startViewTransition(async () => {
    //             resolve();
    //             await navigation.complete;
    //         });
    //     });
    // });
</script>

{@render children()}
