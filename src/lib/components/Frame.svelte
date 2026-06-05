<script>
  import { onMount } from "svelte";
  import { FRAME_WIDTH, FRAME_HEIGHT } from "$lib/constants.js";
  import { buildings } from "$lib/data.js";
  let randomBuildings = [];
  // Fisher-Yates shuffle to select random buildings
  function getRandomBuildings(array, count) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  onMount(() => {
    randomBuildings = getRandomBuildings(buildings, 10);
  });
</script>

<div class="frame" style="width: {FRAME_WIDTH}px; height: {FRAME_HEIGHT}px;">
  <div class="axis">
    <div class="y-axis-construction left"></div>
    <div class="y-axis left"></div>
    <ul>
      {#each randomBuildings as building}
        <li>{building}</li>
      {/each}
    </ul>
    <div class="y-axis-construction right"></div>
    <div class="y-axis right"></div>

    <div class="x-axis-construction"></div>
    <div class="x-axis"></div>
  </div>
</div>

<style>
  .frame {
    border: 6px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul {
    margin: 0;
    padding: 1rem 2rem;
    text-align: center;
    /* border: 1px solid red; */
    position: relative;
    text-transform: uppercase;
  }

  li {
    line-height: 3rem;
    list-style-type: none;
    color: rgba(0, 0, 0, 0.7);
  }

  .axis {
    position: relative;
    display: inline-block;
  }
  .y-axis,
  .y-axis-construction {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .y-axis {
    height: 100%;
    border-left: 2px solid black;
  }

  .y-axis-construction {
    height: calc(100% + 60px);
    border-left: 0.3px solid grey;
  }

  .y-axis-construction.left,
  .y-axis.left {
    left: 0px;
  }

  .y-axis-construction.right,
  .y-axis.right {
    right: 0px;
  }

  .x-axis,
  .x-axis-construction {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
  }

  .x-axis-construction {
    width: calc(100% + 60px);
    border-top: 0.3px solid grey;
  }
  .x-axis {
    width: calc(100% + 20px);
    border-top: 2px solid black;
  }
</style>
