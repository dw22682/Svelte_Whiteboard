<script>
	import Toolbar from "$lib/components/Toolbar.svelte";
	import WhiteboardCanvas from "$lib/components/WhiteboardCanvas.svelte";

</script>


<div class="app-container h-screen flex bg-gray-50">
    <!--Left Sidebar-->
    <div class="w-80 bg-white shadow-xl z-10">
        <Toolbar />
    </div>

    <!--Main Canvas-->
    <div class="flex-1 relative">
        <WhiteboardCanvas />
    </div>
</div>