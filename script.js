//fisher yates shuffle
const shuffleArray = (array) => {
  const shuffled = [...array];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled;
};

const shuffledBuildings = shuffleArray(buildings);
const selectedBuildings = shuffledBuildings.slice(0, 10);
const output = document.getElementById("output");

output.innerHTML = `
  <ul>
    ${selectedBuildings.map((building) => `<li>${building}</li>`).join("")}
  </ul>
`;
