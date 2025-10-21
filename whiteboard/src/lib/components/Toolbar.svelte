<script>
    //@ts-nocheck
  import { currentTool, availableTools, toolActions } from '$lib/stores/toolStore';
  import { brushColor, brushSize, fillColor } from '$lib/stores/toolStore';
  import { whiteboardActions, whiteboardState } from '$lib/stores/whiteboardStore';
  import ColorPicker from './ColourPicker.svelte';
  
  let showColorPicker = false;
  let showBrushSize = false;
</script>

<div class='toolbar bg-white shadow-lg rounded-lg p-4'>
    <div class='grid grid-cols-4 gap-2 mb-4'>
        {#each Object.entries(availableTools) as [id, tool]}
            <button class='p-3 rounded-lg transition-colors flex flex-col items-center bg-gray-100 hover:bg-gray-200'
                class:bg-gray-200={$currentTool === id}
                on:click={() => toolActions.setTool(id)}
                title={tool.name}
            >
                <span class="text-lg">{tool.icon}</span>
                <span class="text-xs mt-1">{tool.name}</span>
            </button>
        {/each}
    </div>

    <div class="space-y-4">
    <!-- Color Picker -->
    <div class="flex items-center space-x-3">
      <span class="text-sm font-medium">Stroke:</span>
      <button
        class="w-8 h-8 rounded border border-gray-300"
        style="background-color: {$brushColor}"
        on:click={() => showColorPicker = !showColorPicker}
      >-</button>
      {#if showColorPicker}
        <div class="absolute z-20 mt-50">
          <ColorPicker
            bind:color={$brushColor}
            on:change={(e) => {
                //toolActions.setColor(e.detail);
                let state = $whiteboardState;
                state.currentColor = e.detail;}}
          />
        </div>
      {/if}
    </div>

<!-- Brush Size -->
    <div class="flex items-center space-x-3">
      <span class="text-sm font-medium">Size:</span>
      <input
        type="range"
        min="1"
        max="50"
        bind:value={$brushSize}
        on:input={(e) => toolActions.setBrushSize(parseInt(e.target.value))}
        class="w-24"
      />
      <span class="text-sm w-8">{$brushSize}px</span>
    </div>
    
    <!-- Action Buttons -->
    <div class="grid grid-cols-2 gap-2 pt-4 border-t">
      <button
        on:click={whiteboardActions.undo}
        class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
      >
        ↶ Undo
      </button>
      <button
        on:click={whiteboardActions.redo}
        class="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm"
      >
        ↷ Redo
      </button>
      <button
        on:click={() => {
          const canvas = get(canvasStore);
          if (canvas) {
            canvas.clear();
            whiteboardActions.saveToHistory();
          }
        }}
        class="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm col-span-2"
      >
        🧹 Clear Canvas
      </button>
    </div>
  </div>
</div>