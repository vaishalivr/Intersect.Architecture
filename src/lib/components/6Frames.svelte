<script>
  import { onMount } from "svelte";
  import { sixFramesTotalWidth, BUILDING_COLORS } from "$lib/constants.js";
  import { buildings } from "$lib/data.js";
  import { getRandomItems, getRandomElement } from "$lib/arrayUtils.js";
  import {
    generateName,
    getFoundQualityWords,
    getFoundConceptNouns,
    getFoundPlaceNouns,
    getFoundProperNames,
  } from "$lib/nameGenerator.js";
  import GridCell from "$lib/components/GridCell.svelte";

  let gridCells = [];

  const refreshAllCursorSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="24" viewBox="0 0 100 24">
      <rect x="0.5" y="4.5" width="91" height="18" rx="3" ry="3" fill="none" stroke="black" stroke-width="1.5"/>
      <text x="6" y="18" font-size="12" font-family="Sora, sans-serif" fill="black">REFRESH ALL</text>
    </svg>
  `;

  const refreshAllCursor = `url("data:image/svg+xml,${encodeURIComponent(
    refreshAllCursorSvg,
  )}") 0 0`;

  function createCellData() {
    const cellBuildings = getRandomItems(buildings, 3);
    const foundQualityWords = getFoundQualityWords(cellBuildings);
    const foundProperNames = getFoundProperNames(cellBuildings);
    const foundConceptNouns = getFoundConceptNouns(cellBuildings);
    const foundPlaceNouns = getFoundPlaceNouns(cellBuildings);
    const textColor = getRandomElement(BUILDING_COLORS);

    return {
      buildings: cellBuildings,
      generatedName: (() => {
        const raw = generateName(
          foundQualityWords,
          foundConceptNouns,
          foundPlaceNouns,
          foundProperNames,
        );
        return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : raw;
      })(),
      textColor,
    };
  }

  function refreshCell(index) {
    gridCells = gridCells.map((cell, cellIndex) =>
      cellIndex === index ? createCellData() : cell,
    );
  }

  function refreshAllCells() {
    gridCells = Array.from({ length: 6 }, () => createCellData());
  }

  onMount(() => {
    gridCells = Array.from({ length: 6 }, () => createCellData());
  });
</script>

<div class="refresh-all-stage" style:--refresh-all-cursor={refreshAllCursor}>
  <button
    class="refresh-all-hotspot"
    type="button"
    aria-label="Refresh all frames"
    on:click={refreshAllCells}
  ></button>

  <div class="main-rect" style:--main-width={sixFramesTotalWidth}>
    {#each gridCells as cell, index}
      <GridCell {cell} onRefresh={() => refreshCell(index)} />
    {/each}
  </div>
</div>

<style>
  .refresh-all-stage {
    position: relative;
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }

  .refresh-all-hotspot {
    position: absolute;
    inset: 0;
    border: 0;
    padding: 0;
    background: transparent;
    cursor: var(--refresh-all-cursor), auto;
  }

  .refresh-all-hotspot:focus-visible {
    outline: 2px solid black;
    outline-offset: -8px;
  }

  .main-rect {
    position: relative;
    z-index: 1;
    width: var(--main-width);
    min-height: clamp(200px, 75vh, 750px);
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: max-content;
    gap: 2rem;
    padding: 2rem;
    border: 0.01px solid black;
    cursor: auto;
  }
</style>
