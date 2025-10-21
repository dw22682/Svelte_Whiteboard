<script>
    // @ts-nocheck
    import { onMount, onDestroy } from 'svelte'
    import { canvasStore } from '$lib/stores/whiteboardStore';
    import { currentTool, toolActions } from '$lib/stores/toolStore';

    let canvasElement;
    let canvas;

    onMount(() => {
        whiteboardActions.initialiseCanvas(canvasElement);

        //handle resizing
        const handleResize = () => {
        if (canvas) {
            canvas.setDimensions({
            width: window.innerWidth - 300,
            height: window.innerHeight - 100
            });
        }
        };

        window.addEventListener('resize', handleResize);

        // Handle keyboard shortcuts
        const handleKeydown = (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                    whiteboardActions.redo();
                    } else {
                    whiteboardActions.undo();
                    }
                    break;
                case 'y':
                    e.preventDefault();
                    whiteboardActions.redo();
                    break;
                case 'c':
                    toolActions.setTool('circle');
                    break;
                case 'r':
                    toolActions.setTool('rectangle');
                    break;
                case 'b':
                    toolActions.setTool('brush');
                    break;
                }
            }

            // Delete selected objects
            if (e.key === 'Delete' || e.key === 'Backspace') {
                const selected = canvas.getActiveObjects();
                if (selected.length > 0) {
                canvas.remove(...selected);
                canvas.discardActiveObject();
                canvas.renderAll();
                whiteboardActions.saveToHistory();
                }
            }
        };
            
        window.addEventListener('keydown', handleKeydown);
            
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeydown);
        };
    });

    onDestroy(() => {
        if (canvas) {
        canvas.dispose();
        }
    });
    
    // Handle tool changes
    $: {
        if (canvas) {
        toolActions.setTool($currentTool);
        }
    }   
</script>

<div class='whiteboard-container relative bg-gray-100 overflow-hidden'>
    <div class='absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-2 text-sm'>
        <!--zoom buttons-->
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => {
          const currentZoom = get(zoomLevel);
          zoomLevel.set(Math.max(0.1, currentZoom - 0.1));
        }}>
            -
        </button>
        <span>{((zoomLevel) * 100).toFixed(0)}%</span>
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => {
          const currentZoom = get(zoomLevel);
          zoomLevel.set(Math.min(3, currentZoom + 0.1));
        }}>
            +
        </button>
        <button class='p-2 hover:bg-gray-100 rounded'
        on:click={() => zoomLevel.set(1)}>
            100%
        </button>
    </div>
    <div class='canvas-container bg-gray-400'>
        <canvas bind:this={canvasElement}></canvas>
    </div>
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