<script>
    //@ts-nocheck
	import {onMount} from 'svelte'
    import { whiteboardState, canvasStore } from '$lib/stores/whiteboardStore'

    let canvas;
    onMount(() => {

        let state = $whiteboardState;
        $canvasStore = canvas;

        //handle resizing
        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth - 300;
                canvas.height = window.innerHeight - 100;
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
            ctx.lineWidth = state.brushSize;
            //ctx.fillRect(Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*300) + 1,1)
            let startX = Math.floor(Math.random() * 800) + 1;
            let starty = Math.floor(Math.random() * 800) + 1;
            let endX = Math.floor(Math.random() * 800) + 1;
            let endY = Math.floor(Math.random() * 800) + 1;

            ctx.moveTo(startX, starty);
            ctx.lineTo(endX, endY);

            ctx.stroke();
        };

        const drawRandomRect = () => {
            console.log("Rectangle");
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = state.currentColor;
            ctx.lineWidth = state.brushSize;
            //ctx.fillRect(Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*300) + 1,1)
            let x = Math.floor(Math.random() * 800) + 1;
            let y = Math.floor(Math.random() * 800) + 1;
            let h = Math.floor(Math.random() * 1600) + 1 - 800;
            let w = Math.floor(Math.random() * 1600) + 1 - 800;

            ctx.rect(x, y, h, w);
            ctx.stroke();
        };

        const drawRandomCircle = () => {
            console.log("Circle");
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            ctx.strokeStyle = state.currentColor;
            ctx.lineWidth = state.brushSize;
            //ctx.fillRect(Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*800) + 1,Math.floor(Math.random()*300) + 1,1)
            let x = Math.floor(Math.random() * 800) + 1;
            let y = Math.floor(Math.random() * 800) + 1;
            let r = Math.floor(Math.random() * 400) + 1;

            ctx.arc(x, y, r, 0, 2* Math.PI, false);
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

            switch (state.currentTool) {
                case('brush'): {
                    state.isDrawing = true;
                    state.lastLocation = {x: clientX - canvas.getBoundingClientRect().left,
                        y: clientY - canvas.getBoundingClientRect().top
                    }
                    draw(
                        clientX - canvas.getBoundingClientRect().left,
                        clientY - canvas.getBoundingClientRect().top
                    );
                    break;
                }
                case('line'): {
                    drawRandomLine();
                    break;
                }
                case('rectangle'): {
                    drawRandomRect();
                    break;
                }
                case('circle'): {
                    drawRandomCircle();
                    break;
                }
                case('eraser'): {
                    state.isDrawing = true;
                    state.lastLocation = {x: clientX - canvas.getBoundingClientRect().left,
                        y: clientY - canvas.getBoundingClientRect().top
                    }
                    erase(
                        clientX - canvas.getBoundingClientRect().left,
                        clientY - canvas.getBoundingClientRect().top
                    );
                    break;  
                }
            }

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
                ctx.lineWidth = state.brushSize;
                //ctx.arcTo(state.lastLocation.x, state.lastLocation.y, x, y, state.brushSize);
                ctx.moveTo(state.lastLocation.x, state.lastLocation.y);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.arc(x, y, state.brushSize / 2, 0, 2 * Math.PI, false);
                ctx.fill();
                state.lastLocation = {x: x, y: y};
            }
        };

        const erase = (x, y) => {
            if(state.isDrawing) {
                let ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.strokeStyle = '#f3f4f6';
                ctx.fillStyle = '#f3f4f6';
                ctx.lineWidth = state.brushSize;
                //ctx.arcTo(state.lastLocation.x, state.lastLocation.y, x, y, state.brushSize);
                ctx.moveTo(state.lastLocation.x, state.lastLocation.y);
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.arc(x, y, state.brushSize / 2, 0, 2 * Math.PI, false);
                ctx.fill();
                state.lastLocation = {x: x, y: y};
            }
        };

        const handleMouseMove = ({clientX, clientY, currentTarget}) => {
            if (state.currentTool === 'brush') {
                draw(
                    clientX - canvas.getBoundingClientRect().left,
                    clientY - canvas.getBoundingClientRect().top
                );
            }
            else {
                erase(
                    clientX - canvas.getBoundingClientRect().left,
                    clientY - canvas.getBoundingClientRect().top
                );
            }
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
                case('t'): {
                    console.log(state.currentTool);
                    break;
                }

                default:
                    return;
            }
        }

        window.addEventListener('keydown', handleKeydown);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('keydown', handleKeydown);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
            canvas.removeEventListener('mousemove', handleMouseMove);
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