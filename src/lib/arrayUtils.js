export function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function getRandomItems(array, count) {
  const shuffled = shuffle(array);
  return shuffled.slice(0, count);
}

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
