import { deserialize } from "$app/forms";

export const buildings = [
  {
    name: "Göbekli Tepe",
    description: "Türkiye",
  },
  {
    name: "Great Pyramid of Giza",
    description: "Egypt",
  },
  {
    name: "Ziggurat of Ur",
    description: "Iraq",
  },
  {
    name: "Karnak Temple Complex",
    description: "Egypt",
  },
  {
    name: "Palace of Knossos",
    description: "Crete, Greece",
  },
  {
    name: "Treasury of Atreus",
    description: "Mycenae, Greece",
  },
  {
    name: "Sanchi Stupa",
    description: "India",
  },
  {
    name: "Parthenon",
    description: "Athens, Greece",
  },
  {
    name: "Apadana at Persepolis",
    description: "Iran",
  },
  {
    name: "Temple of Hephaestus",
    description: "Athens, Greece",
  },
  {
    name: "Great Stupa at Amaravati",
    description: "Amaravati, India",
    description: "Ancient Buddhist dome monument at Amaravati.",
  },
  {
    name: "Library of Celsus",
    description: "Ephesus, Türkiye",
  },
  {
    name: "Pantheon",
    description: "Rome, Italy",
  },
  {
    name: "Colosseum",
    description: "Rome, Italy",
  },
  {
    name: "Maison Carrée",
    description: "Nîmes, France",
  },
  {
    name: "Diocletian’s Palace",
    description: "Split, Croatia",
  },
  {
    name: "Great Bath of the Roman Baths",
    description: "Bath, United Kingdom",
  },
  {
    name: "Temple of the Inscriptions",
    description: "Palenque, Mexico",
  },
  {
    name: "Pyramid of the Sun",
    description: "Teotihuacan, Mexico",
  },
  {
    name: "Tikal Temple I",
    description: "Guatemala",
  },
  {
    name: "Hagia Sophia",
    description: "Istanbul, Türkiye",
  },
  {
    name: "Basilica of San Vitale",
    description: "Ravenna, Italy",
  },
  {
    name: "Hōryū-ji",
    description: "Nara Prefecture, Japan",
  },
  {
    name: "Dome of the Rock",
    description: "Jerusalem",
  },
  {
    name: "Umayyad Mosque",
    description: "Damascus, Syria",
  },
  {
    name: "Borobudur",
    description: "Java, Indonesia",
  },
  {
    name: "Prambanan",
    description: "Java, Indonesia",
  },
  {
    name: "Great Mosque of Samarra",
    description: "Iraq",
  },
  {
    name: "Aachen Cathedral",
    description: "Germany",
  },
  {
    name: "Jokhang Temple",
    description: "Lhasa, Tibet",
  },
  {
    name: "Brihadisvara Temple",
    description: "Thanjavur, India",
  },
  {
    name: "Angkor Wat",
    description: "Cambodia",
  },
  {
    name: "Durham Cathedral",
    description: "United Kingdom",
  },
  {
    name: "Chartres Cathedral",
    description: "France",
  },
  {
    name: "Hoysaleswara Temple",
    description: "Halebidu, India",
  },
  {
    name: "Church of St George, Lalibela",
    description: "Ethiopia",
  },
  {
    name: "Qutb Minar",
    description: "Delhi, India",
  },
  {
    name: "Konark Sun Temple",
    description: "Odisha, India",
  },
  {
    name: "Sainte-Chapelle",
    description: "Paris, France",
  },
  {
    name: "Great Enclosure at Great Zimbabwe",
    description: "Zimbabwe",
  },
  {
    name: "Alhambra",
    description: "Granada, Spain",
  },
  {
    name: "Forbidden City",
    description:
      "Imperial palace complex in Beijing, China, built for rulers to live, govern, and serve",
  },
  {
    name: "Kinkaku-ji",
    description: "Kyoto, Japan",
  },
  {
    name: "Machu Picchu",
    description:
      "1450 Inca site built for leadership, rule and worship in Cusco region of Peru",
  },
  {
    name: "Florence Cathedral",
    description: "Italy",
  },
  {
    name: "Doge’s Palace",
    description: "Venice, Italy",
  },
  {
    name: "Elmina Castle",
    description: "Ghana",
  },
  {
    name: "Château de Chambord",
    description: "France",
  },
  {
    name: "St Peter’s Basilica",
    description: "Vatican City",
  },
  {
    name: "Humayun’s Tomb",
    description: "Delhi, India",
  },
  {
    name: "Süleymaniye Mosque",
    description: "Istanbul, Türkiye",
  },
  {
    name: "St Basil’s Cathedral",
    description: "Moscow, Russia",
  },
  {
    name: "Temple of Heaven",
    description: "Beijing, China",
  },
  {
    name: "Himeji Castle",
    description: "Japan",
  },
  {
    name: "Sultan Ahmed Mosque",
    description: "Istanbul, Türkiye",
  },
  {
    name: "Shah Mosque",
    description: "Isfahan, Iran",
  },
  {
    name: "Taj Mahal",
    description: "Agra, India",
  },
  {
    name: "Potala Palace",
    description: "Lhasa, Tibet",
  },
  {
    name: "Palace of Versailles",
    description: "France",
  },
  {
    name: "St Paul’s Cathedral",
    description: "London, United Kingdom",
  },
  {
    name: "Royal Palace of Caserta",
    description: "Italy",
  },
  {
    name: "Panthéon",
    description: "Paris, France",
  },
  {
    name: "Royal Crescent",
    description: "Bath, United Kingdom",
  },
  {
    name: "Monticello",
    description: "Virginia, United States",
  },
  {
    name: "United States Capitol",
    description: "Washington, D.C.",
  },
  {
    name: "Brandenburg Gate",
    description: "Berlin, Germany",
  },
  {
    name: "British Museum",
    description: "London, United Kingdom",
  },
  {
    name: "Palace of Westminster",
    description: "London, United Kingdom",
  },
  {
    name: "Bibliothèque Sainte-Geneviève",
    description: "Paris, France",
  },
  {
    name: "Crystal Palace",
    description: "London, United Kingdom",
  },
  {
    name: "Red House",
    description: "Bexleyheath, United Kingdom",
  },
  {
    name: "Galleria Vittorio Emanuele II",
    description: "Milan, Italy",
  },
  {
    name: "Chhatrapati Shivaji Maharaj Terminus",
    description: "Mumbai, India",
  },
  {
    name: "Eiffel Tower",
    description:
      "Landmark tower in Paris, France built to gather and entertain visitors",
  },
  {
    name: "Natural History Museum",
    description: "London, United Kingdom",
  },
  {
    name: "Hungarian Parliament Building",
    description: "Budapest, Hungary",
  },
  {
    name: "Wainwright Building",
    description: "St Louis, United States",
  },
  {
    name: "Flatiron Building",
    description: "New York, United States",
  },
  {
    name: "Casa Batlló",
    description: "Barcelona, Spain",
  },
  {
    name: "Glasgow School of Art, Mackintosh Building",
    description: "Glasgow, United Kingdom",
  },
  {
    name: "AEG Turbine Factory",
    description: "Berlin, Germany",
  },
  {
    name: "Robie House",
    description: "Chicago, United States",
  },
  {
    name: "Fagus Factory",
    description: "Alfeld, Germany",
  },
  {
    name: "Einstein Tower",
    description: "Potsdam, Germany",
  },
  {
    name: "Bauhaus Building",
    description: "Dessau, Germany",
  },
  {
    name: "Schröder House",
    description: "Utrecht, Netherlands",
    description:
      "Schröder House is a 1920s Dutch residence known for its flexible open plan, sliding partitions, and bold De Stijl design of intersecting planes and primary colors.",
  },
  {
    name: "Villa Savoye",
    description: "Poissy, France",
  },
  {
    name: "Barcelona Pavilion",
    description: "Barcelona, Spain",
  },
  {
    name: "Chrysler Building",
    description: "New York, United States",
  },
  {
    name: "Empire State Building",
    description: "New York, United States",
  },
  {
    name: "Falling Water",
    description: "Pennsylvania, United States",
    description: "Private weekend home that appears to float over a waterfall",
  },
  {
    name: "Paimio Sanatorium",
    description: "Finland",
  },
  {
    name: "Secretariat Building",
    description: "Chandigarh, India",
  },
  {
    name: "National Assembly Building",
    description: "Dhaka, Bangladesh",
  },
  {
    name: "Brasília Cathedral",
    description: "Brazil",
  },
  {
    name: "Sydney Opera House",
    description: "Sydney, Australia",
  },
  {
    name: "Habitat 67",
    description: "Montreal, Canada",
  },
  {
    name: "Centre Pompidou",
    description: "Paris, France",
  },
  {
    name: "Vanna Venturi House",
    description: "Philadelphia, United States",
  },
  {
    name: "Guggenheim Museum Bilbao",
    description: "Bilbao, Spain",
  },
  {
    name: "Sagrada Família",
    description: "Barcelona, Spain",
  },
  {
    name: "Great Wall of China",
    description: "Northern China",
  },
  {
    name: "Beijing National Stadium",
    description: "Beijing, China",
  },
  {
    name: "Burj Khalifa",
    description: "Dubai, United Arab Emirates",
  },
  {
    name: "The Shard",
    description: "London, United Kingdom",
    description: "Mixed used glass skyscraper",
  },
  {
    name: "Bosco Verticale",
    description: "Milan, Italy",
  },
  {
    name: "National Museum of African American History and Culture",
    description: "Washington, D.C., United States",
  },
  {
    name: "Louvre Abu Dhabi",
    description: "Abu Dhabi, United Arab Emirates",
  },
  {
    name: "Zeitz Museum of Contemporary Art Africa",
    description: "Cape Town, South Africa",
  },
  {
    name: "The Shed",
    description: "New York City, United States",
    description: "Cultural Center for the Arts",
  },
  {
    name: "Sara Kulturhus",
    description: "Skellefteå, Sweden",
  },
  {
    name: "Museum of the Future",
    description: "Dubai, United Arab Emirates",
  },
  {
    name: "Living Landscape",
    description: "Reykjavík, Iceland",
    description: "Proposed zero carbon, mixed used timber building",
  },
  {
    name: "World of Volvo",
    description: "Gothenburg, Sweden",
    description: "Cultural Center of Volvo",
  },
  {
    name: "Timber House",
    description: "Toronto, Canada",
  },
  {
    name: "Naples Underground Central Station",
    description: "Naples, Italy",
  },
  {
    name: "Lucas Museum of Narrative Art",
    description: "Los Angeles, United States",
  },
  {
    name: "Centre des Cultures et Spiritualités Ewés",
    description: "Notsé, Togo",
  },
];

export const placeNouns = [
  "Apadana",
  "Basilica",
  "Bath",
  "Bibliothèque",
  "Building",
  "Capitol",
  "Castle",
  "Cathedral",
  "Centre",
  "Chapelle",
  "Château",
  "Church",
  "City",
  "Colosseum",
  "Complex",
  "Dome",
  "Enclosure",
  "Factory",
  "Galleria",
  "Gate",
  "House",
  "Kulturhus",
  "Library",
  "Maison",
  "Minar",
  "Mosque",
  "Museum",
  "Palace",
  "Pantheon",
  "Parliament",
  "Pavilion",
  "Pyramid",
  "Sanatorium",
  "School",
  "Secretariat",
  "Shed",
  "Station",
  "Stadium",
  "Stupa",
  "Temple",
  "Terminus",
  "Tomb",
  "Tower",
  "Treasury",
  "Villa",
  "Wall",
  "Wat",
  "Ziggurat",
];

export const conceptNouns = [
  "Art",
  "Assembly",
  "Bird",
  "Crescent",
  "Culture",
  "Empire",
  "Future",
  "Habitat",
  "Heaven",
  "History",
  "Inscriptions",
  "Landscape",
  "Narrative",
  "Nest",
  "Opera",
  "Rock",
  "Shard",
  "Spiritualities",
  "State",
  "Sun",
  "Timber",
  "Turbine",
  "Wall",
  "Water",
  "World",
];

export const properPlaceNames = [
  "Abu Dhabi",
  "Aachen",
  "AEG",
  "Africa",
  "African American",
  "Ahmed",
  "Alhambra",
  "Amaravati",
  "Angkor Wat",
  "Atreus",
  "Barcelona",
  "Basil",
  "Batlló",
  "Bauhaus",
  "Beijing",
  "Bilbao",
  "Borobudur",
  "Bosco Verticale",
  "Brandenburg",
  "Brasília",
  "Brihadisvara",
  "Burj",
  "Carrée",
  "Caserta",
  "Celsus",
  "Chambord",
  "Chartres",
  "China",
  "Chhatrapati Shivaji Maharaj",
  "Chrysler",
  "Diocletian",
  "Durham",
  "Eiffel",
  "Einstein",
  "Elmina",
  "Ewés",
  "Fagus",
  "Florence",
  "Giza",
  "Glasgow",
  "Göbekli Tepe",
  "Great Zimbabwe",
  "Guggenheim",
  "Hagia Sophia",
  "Hephaestus",
  "Himeji",
  "Hōryū-ji",
  "Hoysaleswara",
  "Humayun",
  "Jokhang",
  "Karnak",
  "Khalifa",
  "Kinkaku-ji",
  "Knossos",
  "Konark",
  "Lalibela",
  "Louvre",
  "Lucas",
  "Machu Picchu",
  "Mackintosh",
  "Mahal",
  "Monticello",
  "Naples",
  "Paimio",
  "Parthenon",
  "Paul",
  "Persepolis",
  "Peter",
  "Pompidou",
  "Potala",
  "Prambanan",
  "Qutb",
  "Robie",
  "Roman",
  "Samarra",
  "San Vitale",
  "Sanchi",
  "Sara",
  "Savoye",
  "Schröder",
  "Shah",
  "Sydney",
  "Sagrada",
  "Família",
  "Sainte-Geneviève",
  "Süleymaniye",
  "Sultan",
  "Taj Mahal",
  "Tikal",
  "Ur",
  "Umayyad",
  "United States",
  "Vanna Venturi",
  "Venturi",
  "Versailles",
  "Vittorio Emanuele II",
  "Volvo",
  "Wainwright",
  "Westminster",
  "Zeitz",
];

export const qualityWords = [
  "Central",
  "Contemporary",
  "Crystal",
  "Falling",
  "Flatiron",
  "Forbidden",
  "Great",
  "Living",
  "National",
  "Natural",
  "Narrative",
  "Red",
  "Royal",
  "Sagrada",
  "Underground",
  "United",
  "Verticale",
];
