<script>
    //@ts-nocheck
	import {onMount} from 'svelte'
    import {zoomLevel, whiteboardState} from '$lib/stores/whiteboardStore'

    let canvas;
    onMount(() => {

        let state = $whiteboardState;

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
            ctx.strokeStyle = state.currentColor;
            //ctx.fillRect(Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*300) + 1,1)
            let startX = Math.floor(Math.random() * 800) + 1;
            let starty = Math.floor(Math.random() * 800) + 1;
            let endX = Math.floor(Math.random() * 800) + 1;
            let endY = Math.floor(Math.random() * 800) + 1;

            ctx.moveTo(startX, starty);
            ctx.lineTo(endX, endY);

            ctx.stroke();
        };

        const clearScreen = () => {
            console.log("CLEAR SCREEN");
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.clearRect(0,0, canvas.width, canvas.height);
        };

        const handleMouseDown =  ({ clientX, clientY, currentTarget}) => {
            console.log("CLICK");
            state.isDrawing = true;
            draw(
                clientX - canvas.getBoundingClientRect().left,
                clientY - canvas.getBoundingClientRect().top
            );
        }

        const handleMouseUp = () => {
            state.isDrawing = false;
        }

        const draw = (x, y) => {
            if(state.isDrawing) {
                let ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.strokeStyle = state.currentColor;
                ctx.fillStyle = state.currentColor;
                ctx.arc(x, y, state.brushSize, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.stroke();
            }
        };

        const handleMouseMove = ({clientX, clientY, currentTarget}) => {
            draw(
                clientX - canvas.getBoundingClientRect().left,
                clientY - canvas.getBoundingClientRect().top
            );
        }

        const handleKeydown = (event) => {
            switch(event.key){
                case('l'): {
                    drawRandomLine();
                    break;
                }
                case('c'): {
                    clearScreen();
                    break;
                }
                case('p'): {
                    console.log(state.currentColor);
                    break;
                }

                default:
                    return;
            }
        }

        window.addEventListener('keydown', handleKeydown);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeydown);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
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