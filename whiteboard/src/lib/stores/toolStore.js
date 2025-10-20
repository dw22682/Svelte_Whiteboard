// @ts-nocheck
// src/lib/stores/toolStore.js
import { writable } from 'svelte/store';

export const currentTool = writable('brush');
export const brushColor = writable('#000000');
export const brushSize = writable(5);
export const fillColor = writable('#ffffff');

export const availableTools = {
  select: { name: 'Select', icon: '🔍' },
  pan: { name: 'Pan', icon: '✋' },
  brush: { name: 'Brush', icon: '🖌️' },
  rectangle: { name: 'Rectangle', icon: '⬜' },
  circle: { name: 'Circle', icon: '⭕' },
  line: { name: 'Line', icon: '📏' },
  text: { name: 'Text', icon: '📝' },
  eraser: { name: 'Eraser', icon: '🧹' }
};

// Tool actions
export const toolActions = {
  setTool: (tool) => {
    currentTool.set(tool);
    const canvas = get(canvasStore);
    if (!canvas) return;
    
    canvas.isDrawingMode = (tool === 'brush' || tool === 'eraser');
    canvas.selection = (tool === 'select');
    
    if (tool === 'eraser') {
      canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
      canvas.freeDrawingBrush.width = get(brushSize);
    } else if (tool === 'brush') {
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = get(brushColor);
      canvas.freeDrawingBrush.width = get(brushSize);
    }
  },

  setColor: (color) => {
    brushColor.set(color);
    const canvas = get(canvasStore);
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = color;
    }
  },

  setBrushSize: (size) => {
    brushSize.set(size);
    const canvas = get(canvasStore);
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = size;
    }
  }
};