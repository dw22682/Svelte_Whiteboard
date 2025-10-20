// src/lib/utils/drawingTools.js
//@ts-nocheck
import { get } from 'svelte/store';
import { canvasStore, whiteboardActions } from '$lib/stores/whiteboardStore';
import { brushColor, brushSize, fillColor } from '$lib/stores/toolStore';
import { Rect, Circle, IText, Line } from 'fabric';

export const shapeTools = {
  createRectangle: (startPoint, endPoint) => {
    const canvas = get(canvasStore);
    if (!canvas) return;
    
    const rect = new Rect({
      left: Math.min(startPoint.x, endPoint.x),
      top: Math.min(startPoint.y, endPoint.y),
      width: Math.abs(endPoint.x - startPoint.x),
      height: Math.abs(endPoint.y - startPoint.y),
      fill: get(fillColor),
      stroke: get(brushColor),
      strokeWidth: get(brushSize),
      selectable: true
    });
    
    canvas.add(rect);
    whiteboardActions.saveToHistory();
  },

  createCircle: (startPoint, endPoint) => {
    const canvas = get(canvasStore);
    if (!canvas) return;
    
    const radius = Math.sqrt(
      Math.pow(endPoint.x - startPoint.x, 2) + 
      Math.pow(endPoint.y - startPoint.y, 2)
    ) / 2;
    
    const circle = new Circle({
      left: startPoint.x - radius,
      top: startPoint.y - radius,
      radius: radius,
      fill: get(fillColor),
      stroke: get(brushColor),
      strokeWidth: get(brushSize),
      selectable: true
    });
    
    canvas.add(circle);
    whiteboardActions.saveToHistory();
  },

  createLine: (startPoint, endPoint) => {
    const canvas = get(canvasStore);
    if (!canvas) return;
    
    const line = new Line([
      startPoint.x, startPoint.y,
      endPoint.x, endPoint.y
    ], {
      stroke: get(brushColor),
      strokeWidth: get(brushSize),
      selectable: true
    });
    
    canvas.add(line);
    whiteboardActions.saveToHistory();
  },

  addText: (position, text = 'Double click to edit') => {
    const canvas = get(canvasStore);
    if (!canvas) return;
    
    const textObj = new IText(text, {
      left: position.x,
      top: position.y,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: get(brushColor),
      selectable: true
    });
    
    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    whiteboardActions.saveToHistory();
  }
};
