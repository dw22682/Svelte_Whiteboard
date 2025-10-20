

<div class='whiteboard-container relative bg-gray-100 overflow-hidden'>
    <div class='absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 text-sm'>
        <!--zoom buttons-->
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => {}}>
            +
        </button>
        <span>100%</span>
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => {}}>
            -
        </button>
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => {}}>
            100%
        </button>
    </div>
</div>

<div class='canvas-container'>
    <canvas></canvas>
</div>

<style>
    .whiteboard-container {
        width: 100vw;
        height: 100vh;
    }

    .canvas-container {
        width: 100%;
        height: 100%;
        cursor: crosshair;
    }
</style>