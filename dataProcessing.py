import random

buildings = [
    "Royal Ontario Museum",
    "Museum of Islamic Art",
    "Art Gallery of Ontario",
    "Ontario Science Centre",
    "Centre Pompidou",
    "Pompidou Centre-Metz",
    "Burj Khalifa",
    "Khalifa International Stadium",
    "Stadium Australia",
    "Australia Square",
    "Colosseum",
    "National Gallery",
    "Gallery of Modern Art",
    "Modern Art Museum of Fort Worth",
    "Art Institute of Chicago",
    "Chicago Cultural Center",
    "Center for Architecture",
    "Oslo Opera House",
    "House of the Blackheads",
    "Blackheads House Museum",
    "Art Gallery of New South Wales",
    "Wales Millennium Centre",
    "Lotus Temple",
    "Temple of Heaven",
    "Heavenly Gate",
    "Gate Tower Building",
    "Guggenheim Museum",
    "Tower Bridge",
    "Bridge of Sighs",
    "Taj Mahal",
    "Taj Mahal Palace Hotel",
]


def pick_random_buildings(building_list, count=10):
    """Return a random selection of up to `count` unique buildings."""
    if count <= 0:
        return []
    if count >= len(building_list):
        return building_list.copy()
    return random.sample(building_list, count)


if __name__ == "__main__":
    chosen_buildings = pick_random_buildings(buildings, 10)
    print("Random 10 buildings:")
    for building in chosen_buildings:
        print(building)
