<script>
// @ts-nocheck

	import Toolbar from "$lib/components/Toolbar.svelte";
    import Whiteboard from "$lib/components/Whiteboard.svelte";

    let showLayers = false;
</script>

<div class="app-container h-screen flex bg-gray-50">
    <!--Left Sidebar-->
    <div class="w-80 bg-white shadow-xl z-10">
        <Toolbar />

    </div>

    <!--Main Canvas-->
    <div class="flex-1 relative">
        <Whiteboard />
    </div>
</div>