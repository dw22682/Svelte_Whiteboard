<script>
    //@ts-nocheck
	import {onMount} from 'svelte'
    import {zoomLevel} from '$lib/stores/whiteboardStore'

    let canvas;
    onMount(() => {

        //handle resizing
        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth - 300;
                canvas.height = window.innerHeight - 100;
                console.log(window.innerWidth);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.fillRect(100,100,100,1)
        ctx.stroke();

        const drawRandomLine = () => {
            console.log("LINE");
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.fillRect(Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*300) + 1,1)
            ctx.stroke();
        };

        window.addEventListener('mousedown', drawRandomLine);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousedown', handleKeydown);
        };
    })
</script>

<div class='whiteboard-container relative bg-gray-100 overflow-hidden'>
    <div class="canvas-container">
        <canvas bind:this={canvas}></canvas>
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