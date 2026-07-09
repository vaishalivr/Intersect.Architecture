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

<div
  class="main-rect"
  role="button"
  tabindex="0"
  aria-label="Refresh all frames"
  style:--main-width={sixFramesTotalWidth}
  on:click={refreshAllCells}
  on:keydown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      refreshAllCells();
    }
  }}
>
  {#each gridCells as cell, index}
    <GridCell {cell} onRefresh={() => refreshCell(index)} />
  {/each}
</div>

<style>
  .main-rect {
    width: var(--main-width);
    min-height: clamp(200px, 75vh, 750px);
    height: auto;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-auto-rows: max-content;
    gap: 2rem;
    padding: 2rem;
    border: 0.01px solid black;
    cursor:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="36" viewBox="0 0 120 36"><circle cx="18" cy="18" r="15" fill="none" stroke="black" stroke-width="1.5"/><g transform="translate(40 18)"><text text-anchor="end" font-size="10" fill="black"><tspan x="0" dy="0">REFRESH</tspan><tspan x="0" dy="10">ALL</tspan></text></g></svg>')
        16 16,
      auto;
  }
</style>
