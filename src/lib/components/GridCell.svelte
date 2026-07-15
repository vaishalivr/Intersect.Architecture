<script>
  export let cell = {};
  export let onRefresh = () => {};

  const refreshFrameCursorSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="24" viewBox="0 0 120 24">
      <rect x="0.5" y="4.5" width="115" height="18" rx="3" ry="3" fill="none" stroke="black" stroke-width="1.5"/>
      <text x="6" y="18" font-size="12" font-family="Sora, sans-serif" fill="black">REFRESH FRAME</text>
    </svg>
  `;

  const refreshFrameCursor = `url("data:image/svg+xml,${encodeURIComponent(
    refreshFrameCursorSvg,
  )}") 60 12`;
</script>

<div
  class="grid-cell"
  role="button"
  tabindex="0"
  style:--refresh-frame-cursor={refreshFrameCursor}
  on:click|stopPropagation={() => onRefresh()}
  on:keydown|stopPropagation={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRefresh();
    }
  }}
>
  {#if cell.generatedName}
    <div
      class="cell-generated-name"
      style="border-bottom: 3px solid black; color: {cell.textColor};"
    >
      {cell.generatedName}
    </div>
  {/if}
  <div class="building-list">
    {#each cell.buildings as building}
      <div class="building-item">
        <div class="building-name" style:color={cell.textColor}>
          {building.name}
        </div>
        <!-- <div class="building-description">{building.description}</div> -->
      </div>
    {/each}
  </div>
</div>

<style>
  .grid-cell {
    border: 6px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    font-family: "Roboto", sans-serif;
    height: 390px;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    background-image: radial-gradient(circle, #d3d3d3 1px, transparent 1px);
    background-size: 3% 3%;
  }

  .grid-cell:hover {
    cursor: var(--refresh-frame-cursor), auto;
  }

  .cell-generated-name {
    font-family: "Adobe Handwriting Ernie", "Segoe Script", "Bradley Hand",
      cursive;
    font-size: 2.4rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
  }

  .building-list {
    display: grid;
    gap: 0.1rem;
    margin-top: auto;
  }

  .building-item {
    display: flex;
    flex-direction: column;
  }

  .building-name {
    position: relative;
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.1rem;
    transition: color 0.25s ease;
  }

  .building-item:hover .building-name::after {
    opacity: 1;
    transform: translateX(0);
  }
</style>
