// @ts-nocheck
import { Canvas } from "fabric";
import { writable, derived } from "svelte/store";

export const canvasStore = writable(null);
export const objectsStore = writable([]);
export const selectedObjectsStore = writable([]);
export const zoomLevel = writable(1);
export const panOffset = writable({ x: 0, y: 0 });

export const whiteboardState = writable({
  backgroundColor: '#ffffff',
  gridEnabled: false,
  gridSize: 20,
  snapToGrid: false,
  isDrawing: false,
  currentTool: 'select',
  currentColor: '#000000',
  brushSize: 5,
  history: [],
  historyIndex: -1
});

//Actions
export const whiteboardActions = {
    initialiseCanvas: (element) => {
        const canvas = new Canvas(element, {
            width: window.innerWidth - 300,
            height: window.innerHeight - 100,
            selection: true,
            preserveObjectStacking: true
        });

        canvasStore.set(canvas)

        // Set up event listeners
        canvas.on('object:added', (e) => {
        objectsStore.update(objects => [...objects, e.target]);
        });
        
        canvas.on('object:modified', (e) => {
        whiteboardActions.saveToHistory();
        });
        
        canvas.on('selection:created', (e) => {
        selectedObjectsStore.set(e.selected);
        });
        
        canvas.on('selection:cleared', () => {
        selectedObjectsStore.set([]);
        });
    },

    saveToHistory: () => {
        whiteboardState.update(state => {
        const canvas = get(canvasStore);
        if (!canvas) return state;
        
        const json = canvas.toJSON();
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(json);
        
        return {
            ...state,
            history: newHistory,
            historyIndex: newHistory.length - 1
        };
        });
    },

    undo: () => {
        whiteboardState.update(state => {
        if (state.historyIndex <= 0) return state;
        
        const canvas = get(canvasStore);
        const newIndex = state.historyIndex - 1;
        canvas.loadFromJSON(state.history[newIndex], () => {
            canvas.renderAll();
        });

      return { ...state, historyIndex: newIndex };
    });
  },

  redo: () => {
    whiteboardState.update(state => {
      if (state.historyIndex >= state.history.history - 1) return state;
      
      const canvas = get(canvasStore);
      const newIndex = state.historyIndex + 1;
      canvas.loadFromJSON(state.history[newIndex], () => {
        canvas.renderAll();
      });
      
      return { ...state, historyIndex: newIndex };
    });
  }
};