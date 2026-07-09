import {
  placeNouns,
  conceptNouns,
  properPlaceNames,
  qualityWords,
} from "$lib/data.js";
import { getRandomElement } from "$lib/arrayUtils.js";

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

export function getFoundPlaceNouns(cellBuildings) {
  return findMatchingNounObjects(placeNouns, cellBuildings);
}

export function getFoundConceptNouns(cellBuildings) {
  return findMatchingNounObjects(conceptNouns, cellBuildings);
}

export function getFoundProperNames(cellBuildings) {
  return findMatchingNounObjects(properPlaceNames, cellBuildings);
}

export function getFoundQualityWords(cellBuildings) {
  return findMatchingNounObjects(qualityWords, cellBuildings);
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

export function generateName(
  foundQuality,
  foundConcept,
  foundPlace,
  foundProper,
) {
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
