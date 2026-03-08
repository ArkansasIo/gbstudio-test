export type SciFiPlanetType =
  | "terrestrial"
  | "gas_giant"
  | "ice_world"
  | "desert"
  | "ocean"
  | "volcanic"
  | "artificial"
  | "barren";

export interface SciFiPlanetDefinition {
  id: string;
  name: string;
  type: SciFiPlanetType;
  system: string;
  climate: string;
  resources: string[];
  faction: string;
  population: string;
  description: string;
}

export const SCIFI_PLANETS: SciFiPlanetDefinition[] = [
  {
    id: "earth",
    name: "Earth",
    type: "terrestrial",
    system: "Sol",
    climate: "Temperate with diverse biomes across continents",
    resources: ["agriculture", "manufacturing", "rare-earth-elements"],
    faction: "terran",
    population: "12.4 billion",
    description: "The cradle of Terran civilisation. A heavily urbanised world with vast arcology spires alongside preserved wilderness reserves.",
  },
  {
    id: "vorath-prime",
    name: "Vorath Prime",
    type: "terrestrial",
    system: "Andhar",
    climate: "Hot and humid with dense fungal forests and underground hive structures",
    resources: ["bio-compounds", "crystalline-resins", "nutrient-slurry"],
    faction: "vorthari",
    population: "8.9 billion",
    description: "Homeworld of the Vorthari. The surface is dominated by kilometre-scale fungal growths and Vorthari underground hive complexes.",
  },
  {
    id: "kreth",
    name: "Kreth",
    type: "volcanic",
    system: "Molgara",
    climate: "Scorching volcanic with acid rain and ash-blanketed continents",
    resources: ["heavy-metals", "sulphur-compounds", "magma-crystals"],
    faction: "krellax",
    population: "5.1 billion",
    description: "A brutal world that forged the Krellax into the most physically resilient species known. Constant geological activity shapes both terrain and culture.",
  },
  {
    id: "aethon-core",
    name: "Aethon Core",
    type: "artificial",
    system: "Radiant Cluster",
    climate: "No conventional climate; the structure regulates internal energy fields",
    resources: ["photon-energy", "quantum-crystals", "consciousness-matrices"],
    faction: "luminex",
    population: "2.2 billion consciousness nodes",
    description: "A colossal crystalline megastructure built by the Luminex over millennia. It serves as homeworld, temple, and computational centre simultaneously.",
  },
  {
    id: "nova-station-9",
    name: "Nova Station 9",
    type: "artificial",
    system: "Caldris Junction",
    climate: "Fully climate-controlled interior habitat rings",
    resources: ["trade-goods", "fuel-depots", "repair-facilities"],
    faction: "terran",
    population: "4.2 million",
    description: "The largest Terran deep-space trading hub. Its ring docks accommodate everything from single-crew scouts to Drokan heavy haulers.",
  },
  {
    id: "syndara",
    name: "Syndara",
    type: "ocean",
    system: "Lethis Nebula",
    climate: "Warm oceanic world with floating archipelago cities above the cloud layer",
    resources: ["rare-aquatic-biologics", "deep-sea-minerals", "nebula-gases"],
    faction: "syndari",
    population: "3.7 billion",
    description: "The Syndari homeworld shrouded in perpetual nebula haze. Its floating sky-cities are centres of commerce, espionage, and art.",
  },
  {
    id: "drok",
    name: "Drok",
    type: "barren",
    system: "Ashfeld",
    climate: "Airless rock with extreme temperature swings between day and night cycles",
    resources: ["iron-ore", "titanium-deposits", "rare-isotopes"],
    faction: "drokan",
    population: "1.8 billion",
    description: "The Drokan homeworld, rich in mineral wealth but hostile to organic life. The entire population lives in pressurised underground warrens.",
  },
  {
    id: "permafrost-seven",
    name: "Permafrost VII",
    type: "ice_world",
    system: "Halgrath Outer Rim",
    climate: "Sub-zero glacial with frozen methane lakes and ammonia storms",
    resources: ["frozen-water-ice", "methane-clathrates", "subsurface-ore"],
    faction: "neutral",
    population: "Uninhabited – research outpost only",
    description: "A contested outer rim world rich in frozen water and methane reserves. Both Terran and Drokan corporations maintain rival extraction outposts.",
  },
  {
    id: "nyx-veil",
    name: "Nyx Veil",
    type: "barren",
    system: "Umbra Rift",
    climate: "Perpetual darkness with sub-space energy bleed creating aurora-like phenomena",
    resources: ["sub-space-crystals", "dark-matter-particles"],
    faction: "nyxari",
    population: "Unknown",
    description: "The Nyxari homeworld at the edge of mapped space. Its terrain partially overlaps with sub-space, making surface navigation treacherous for outsiders.",
  },
  {
    id: "argos-prime",
    name: "Argos Prime",
    type: "desert",
    system: "Argos",
    climate: "Scorching arid desert with rare oasis regions around deep-water aquifers",
    resources: ["spice-analogues", "sand-glass-minerals", "solar-energy"],
    faction: "neutral",
    population: "680 million",
    description: "A contested neutral world with enormous solar energy potential. Multiple factions have competing interests in its spice analogue trade.",
  },
];
