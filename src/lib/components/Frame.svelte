<script>
  import { onMount } from "svelte";
  import {
    FRAME_WIDTH,
    FRAME_HEIGHT,
    ROTATIONS,
    BUILDING_COLORS,
  } from "$lib/constants.js";
  import { buildings } from "$lib/data.js";

  let randomBuildings = [];
  //const rotations = [-90, -30, -45, -60, 30, 45, 60, 90, 120, 180];

  // Fisher-Yates shuffle to select random buildings
  function getRandomBuildings(array, count) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  function randomRotation() {
    return ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
  }

  function randomColor() {
    return BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];
  }

  onMount(() => {
    randomBuildings = getRandomBuildings(buildings, 10).map((building) => ({
      name: building,
      color: randomColor(),
    }));
  });
</script>

<div class="frame" style="width: {FRAME_WIDTH}px; height: {FRAME_HEIGHT}px;">
  <div class="axis">
    <div class="y-axis-construction left"></div>
    <div class="y-axis left"></div>
    <ul>
      {#each randomBuildings as building}
        <li style:color={building.color}>
          {#each Array.from(building.name) as letter}
            <span class="letter">
              <span
                class="letter-rotator"
                style:--rotation={`${randomRotation()}deg`}
              >
                <span class="letter-inner">
                  {letter === " " ? "\u00A0" : letter}
                </span>
              </span>
            </span>
          {/each}
        </li>
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
    height: calc(100% + 30px);
    border-left: 2px solid black;
  }

  .y-axis-construction {
    height: calc(100% + 70px);
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

  .letter {
    display: inline-block;
    cursor: pointer;
    position: relative;
    line-height: 1;
    border: 1px solid red;
  }

  .letter-rotator {
    display: inline-block;
    transition: transform 300ms ease 900ms;
    pointer-events: none;
    position: relative;
  }
  .letter-inner {
    display: inline-block;
    opacity: 1;
    transition:
      transform 300ms ease 900ms,
      opacity 300ms ease 900ms;
  }
  .letter:hover .letter-rotator {
    transition-delay: 0ms;
    transform: rotate(var(--rotation));
  }
  .letter:hover .letter-inner {
    transition-delay: 0ms;
    transform: scale(4.5);
    opacity: 0.6;
  }
  .letter-rotator::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1px;
    height: 6em;
    background: repeating-linear-gradient(
      to bottom,
      #767b91 0 0.75em,
      transparent 0.75em 1em,
      #767b91 1em 1.12em,
      transparent 1.12em 1.37em
    );
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0ms linear 1200ms;
  }
  .letter:hover .letter-rotator::after {
    opacity: 1;
    transition-delay: 0ms;
  }
</style>
