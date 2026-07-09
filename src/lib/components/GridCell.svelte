<script>
  export let cell = {};
  export let onRefresh = () => {};
</script>

<div
  class="grid-cell"
  role="button"
  tabindex="0"
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
  }

  .grid-cell:hover {
    cursor:
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="36" viewBox="0 0 120 36"><circle cx="18" cy="18" r="15" fill="none" stroke="black" stroke-width="1.5"/><g transform="translate(40 18)"><text text-anchor="end" font-size="10" fill="black"><tspan x="0" dy="0">REFRESH</tspan><tspan x="0" dy="10">FRAME</tspan></text></g></svg>')
        16 16,
      auto;
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
    border: 1px solid rgba(0, 0, 0, 0.12);
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
