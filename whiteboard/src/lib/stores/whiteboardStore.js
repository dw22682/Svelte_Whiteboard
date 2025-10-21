// @ts-nocheck
import { Canvas } from "fabric";
import { writable, derived } from "svelte/store";

export const canvasStore = writable(null);

export const whiteboardState = writable({
  backgroundColor: '#ffffff',
  isDrawing: false,
  currentTool: 'brush',
  currentColor: '#000000',
  brushSize: 5,
  lastLocation: {x: 0, y: 0},
  history: [],
  historyIndex: -1
});