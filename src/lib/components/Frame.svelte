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
    properPlaceNames,
    qualityWords,
  } from "$lib/data.js";

  let randomBuildings = [];
  let generatedName = "";

  function getBuildingInfo(building) {
    return {
      name: building.name,
      location: building.location,
      description: building.description || "",
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

  function findMatchingNounObjects(nounList) {
    const matches = [];

    randomBuildings.forEach((building) => {
      nounList.forEach((noun) => {
        if (containsFullWord(building.name, noun)) {
          matches.push({ noun, source: building.name });
        }
      });
    });

    return matches;
  }

  function getFoundPlaceNouns() {
    return findMatchingNounObjects(placeNouns);
  }

  function getFoundConceptNouns() {
    return findMatchingNounObjects(conceptNouns);
  }

  function getFoundProperNames() {
    return findMatchingNounObjects(properPlaceNames);
  }

  function getFoundQualityWords() {
    return findMatchingNounObjects(qualityWords);
  }

  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function getRandomCandidateExcluding(candidates, excludedSources) {
    const filtered = candidates.filter(
      (candidate) => !excludedSources.includes(candidate.source),
    );
    return filtered.length > 0 ? getRandomElement(filtered) : null;
  }

  function buildNameFromPattern(pattern, founds) {
    const chosen = [];
    const usedSources = new Set();

    for (const category of pattern) {
      const nextCandidate = getRandomCandidateExcluding(
        founds[category],
        Array.from(usedSources),
      );
      if (!nextCandidate) return null;

      chosen.push(nextCandidate.noun);
      usedSources.add(nextCandidate.source);
    }

    return chosen.join(" ");
  }

  function generateName(foundQuality, foundConcept, foundPlace, foundProper) {
    const qualityCount = foundQuality.length;
    const properCount = foundProper.length;
    const total = qualityCount + properCount;
    const qualityProbability = total > 0 ? qualityCount / total : 0;
    const useQualityPattern = Math.random() < qualityProbability;
    const founds = {
      quality: foundQuality,
      concept: foundConcept,
      place: foundPlace,
      proper: foundProper,
    };

    if (useQualityPattern) {
      return (
        buildNameFromPattern(["quality", "concept", "place"], founds) ||
        buildNameFromPattern(["quality", "place"], founds) ||
        buildNameFromPattern(["quality", "proper"], founds) ||
        buildNameFromPattern(["quality", "concept"], founds)
      );
    }

    return (
      buildNameFromPattern(["proper", "concept", "place"], founds) ||
      buildNameFromPattern(["proper", "place"], founds) ||
      buildNameFromPattern(["quality", "proper"], founds) ||
      buildNameFromPattern(["quality", "place"], founds) ||
      buildNameFromPattern(["concept", "place"], founds) ||
      buildNameFromPattern(["proper", "place"], founds) ||
      buildNameFromPattern(["quality", "proper"], founds) ||
      buildNameFromPattern(["quality"], founds) ||
      buildNameFromPattern(["proper"], founds) ||
      buildNameFromPattern(["place"], founds) ||
      buildNameFromPattern(["concept"], founds)
    );
  }

  onMount(() => {
    const chosenColor =
      BUILDING_COLORS[Math.floor(Math.random() * BUILDING_COLORS.length)];
    randomBuildings = getRandomBuildings(buildings, 5).map((building) => ({
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

    generatedName = generateName(
      foundQualityWords,
      foundConceptNouns,
      foundPlaceNouns,
      foundProperNames,
    );
    console.log("generatedName", generatedName);
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
      <span class="description">{building.description}</span>
    {/each}
    {#if generatedName}
      <div class="generated-name">{generatedName}</div>
    {/if}
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

  .generated-name {
    margin-top: 1rem;
    font-size: 1rem;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .location,
  .description {
    display: block;
    font-size: 0.6rem;
    color: rgba(0, 0, 0, 0.5);
    line-height: 1.2;
  }

  .location {
    margin-top: -1rem;
  }

  .description {
    margin-top: 0.1rem;
  }
</style>
