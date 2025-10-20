<!-- src/lib/components/ColorPicker.svelte -->
<script>
  //@ts-nocheck
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  export let color = '#000000';
  
  const colorPalette = [
    '#000000', '#ffffff', '#ff3b30', '#ff9500', '#ffcc00',
    '#4cd964', '#5ac8fa', '#007aff', '#5856d6', '#ff2d55',
    '#8e8e93', '#c7c7cc', '#d1d1d6', '#e5e5ea', '#f2f2f7'
  ];
  
  function handleColorSelect(newColor) {
    color = newColor;
    dispatch('change', newColor);
  }
</script>

<div class="color-picker bg-white p-3 rounded-lg shadow-xl border">
  <div class="grid grid-cols-5 gap-2 mb-3">
    {#each colorPalette as paletteColor}
      <button
        class="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
        style="background-color: {paletteColor}"
        on:click={() => handleColorSelect(paletteColor)}
      >-</button>
    {/each}
  </div>
  
  <div class="flex items-center space-x-2">
    <input
      type="color"
      bind:value={color}
      on:input={(e) => handleColorSelect(e.target.value)}
      class="w-full h-8"
    />
    <span class="text-sm font-mono">{color}</span>
  </div>
</div>