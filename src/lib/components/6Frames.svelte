<script>
  import { onMount } from "svelte";
  import { sixFramesTotalWidth } from "$lib/constants.js";
  import {
    buildings,
    placeNouns,
    conceptNouns,
    properPlaceNames,
    qualityWords,
  } from "$lib/data.js";

  let gridCells = [];

  function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function getRandomItems(array, count) {
    const shuffled = shuffle(array);
    return shuffled.slice(0, count);
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

  function findMatchingNounObjects(nounList, cellBuildings) {
    const matches = [];

    cellBuildings.forEach((building) => {
      nounList.forEach((noun) => {
        if (containsFullWord(building.name, noun)) {
          matches.push({ noun, source: building.name });
        }
      });
    });

    return matches;
  }

  function getFoundPlaceNouns(cellBuildings) {
    return findMatchingNounObjects(placeNouns, cellBuildings);
  }

  function getFoundConceptNouns(cellBuildings) {
    return findMatchingNounObjects(conceptNouns, cellBuildings);
  }

  function getFoundProperNames(cellBuildings) {
    return findMatchingNounObjects(properPlaceNames, cellBuildings);
  }

  function getFoundQualityWords(cellBuildings) {
    return findMatchingNounObjects(qualityWords, cellBuildings);
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
    gridCells = Array.from({ length: 6 }, () => {
      const cellBuildings = getRandomItems(buildings, 4);
      const foundQualityWords = getFoundQualityWords(cellBuildings);
      const foundProperNames = getFoundProperNames(cellBuildings);
      const foundConceptNouns = getFoundConceptNouns(cellBuildings);
      const foundPlaceNouns = getFoundPlaceNouns(cellBuildings);

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
      };
    });
  });
</script>

<div class="main-rect" style:--main-width={sixFramesTotalWidth}>
  {#each gridCells as cell}
    <div class="grid-cell">
      {#if cell.generatedName}
        <div class="cell-generated-name" style="border-bottom: 3px solid teal;">
          {cell.generatedName}
        </div>
      {/if}
      <div class="building-list">
        {#each cell.buildings as building}
          <div class="building-item">
            <div class="building-name">
              {building.name}
            </div>
            <div class="building-description">{building.description}</div>
          </div>
        {/each}
      </div>
    </div>
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
    gap: 1.5rem;
    padding: 1.5rem;
    border: 0.01px solid black;
  }

  .grid-cell {
    border: 6px solid black;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
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

  /* .building-item:hover {
    align-items: flex-start;
    padding-left: 0.4rem;
  } */

  .building-name {
    position: relative;
    text-align: center;
    font-weight: 500;
    margin-bottom: 0.1rem;
    transition: color 0.25s ease;
  }

  /* .building-item:hover .building-name::after {
    content: attr(data-alt);
    display: block;
    width: 100%;
    margin-top: 0.25rem;
    font-size: 0.85rem;
  } */

  .building-item:hover .building-name::after {
    opacity: 1;
    transform: translateX(0);
  }

  .building-description {
    text-align: center;
    font-size: 0.75rem;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
