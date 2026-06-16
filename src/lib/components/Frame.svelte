<script>
  import { onMount } from "svelte";
  import {
    FRAME_WIDTH,
    FRAME_HEIGHT,
    ROTATIONS,
    BUILDING_COLORS,
  } from "$lib/constants.js";
  import {
    buildings,
    placeNouns,
    conceptNouns,
    properNames,
    qualityWords,
  } from "$lib/data.js";

  let randomBuildings = [];

  function getBuildingInfo(building) {
    return {
      name: building.name,
      location: building.location,
    };
  }

  // Fisher-Yates shuffle to select random building names
  function getRandomBuildings(array, count) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
      .slice(0, count)
      .map((building) => getBuildingInfo(building));
  }

  function randomRotation() {
    return ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)];
  }

  function buildWordTokens(text) {
    return text.toLowerCase().match(/\p{L}+/gu) ?? [];
  }

  function containsFullWord(name, noun) {
    const nameTokens = buildWordTokens(name);
    const nounTokens = buildWordTokens(noun);
    if (nounTokens.length === 0) return false;

    if (nounTokens.length === 1) {
      return nameTokens.includes(nounTokens[0]);
    }

    for (let i = 0; i <= nameTokens.length - nounTokens.length; i += 1) {
      let match = true;
      for (let j = 0; j < nounTokens.length; j += 1) {
        if (nameTokens[i + j] !== nounTokens[j]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }

    return false;
  }

  function findMatchingNouns(nounList) {
    return nounList.filter((noun) =>
      randomBuildings.some((b) => containsFullWord(b.name, noun)),
    );
  }

  function getFoundPlaceNouns() {
    return findMatchingNouns(placeNouns);
  }

  function getFoundConceptNouns() {
    return findMatchingNouns(conceptNouns);
  }

  function getFoundProperNames() {
    return findMatchingNouns(properNames);
  }

  function getFoundQualityWords() {
    return findMatchingNouns(qualityWords);
  }

  onMount(() => {
    const chosenColor =
      BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];
    randomBuildings = getRandomBuildings(buildings, 10).map((building) => ({
      ...building,
      color: chosenColor,
    }));
    console.log("randomBuildings", randomBuildings);

    const foundQualityWords = getFoundQualityWords();
    console.log("foundQualityWords", foundQualityWords);

    const foundProperNames = getFoundProperNames();
    console.log("foundProperNames", foundProperNames);

    const foundConceptNouns = getFoundConceptNouns();
    console.log("foundConceptNouns", foundConceptNouns);

    const foundPlaceNouns = getFoundPlaceNouns();
    console.log("foundPlaceNouns", foundPlaceNouns);
  });
</script>

<div class="frame" style="width: {FRAME_WIDTH}px; height: {FRAME_HEIGHT}px;">
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
      <span class="location">{building.location}</span>
    {/each}
  </ul>
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

  .letter {
    display: inline-block;
    cursor: pointer;
    position: relative;
    line-height: 1;
    /* border: 1px solid red; */
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

  .location {
    display: block;
    font-size: 0.6rem;
    color: rgba(0, 0, 0, 0.5);
    margin-top: -1rem;
  }
</style>
