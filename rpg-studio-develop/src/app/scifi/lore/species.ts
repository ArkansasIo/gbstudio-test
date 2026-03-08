export interface SciFiSpeciesDefinition {
  id: string;
  name: string;
  homeworld: string;
  biology: string;
  culture: string;
  technology: string;
  traits: string[];
  relations: Record<string, "allied" | "neutral" | "hostile">;
}

export const SCIFI_SPECIES: SciFiSpeciesDefinition[] = [
  {
    id: "terran",
    name: "Terran",
    homeworld: "Earth, Sol System",
    biology: "Bipedal carbon-based mammals with moderate lifespans averaging 80 years. Adaptable to a wide range of environments.",
    culture: "Democratic federations with strong individual rights traditions. Terrans value exploration, commerce, and scientific inquiry.",
    technology: "Mid-tier generalists. Proficient in warp drives, conventional kinetic weapons, and modular ship design.",
    traits: ["Adaptable", "Diplomatic", "Industrious", "Curious"],
    relations: { vorthari: "allied", krellax: "neutral", syndari: "hostile", luminex: "allied", drokan: "neutral", nyxari: "neutral", velosian: "allied", umbrath: "hostile" },
  },
  {
    id: "vorthari",
    name: "Vorthari",
    homeworld: "Vorath Prime, Andhar System",
    biology: "Tall insectoid beings with six limbs, compound eyes, and chitinous exoskeletons. Highly resistant to radiation.",
    culture: "Caste-based hive societies governed by a Matriarch Council. Honour and collective duty above individual gain.",
    technology: "Advanced in bio-integrated ship design and particle beam weaponry. Excel at long-range precision strikes.",
    traits: ["Disciplined", "Resilient", "Collective", "Honourable"],
    relations: { terran: "allied", krellax: "hostile", syndari: "neutral", luminex: "neutral", drokan: "hostile", nyxari: "allied", velosian: "neutral", umbrath: "hostile" },
  },
  {
    id: "krellax",
    name: "Krellax",
    homeworld: "Kreth, Molgara System",
    biology: "Massive reptilian quadrupeds with dense bone plating and a secondary neural cluster for combat reflexes.",
    culture: "Warrior clans united under a Supreme Warlord. Conquest and tribute define their political structure.",
    technology: "Heavy armour plating, plasma siege cannons, and boarding assault craft. Brutal but effective.",
    traits: ["Aggressive", "Tenacious", "Brutal", "Hierarchical"],
    relations: { terran: "hostile", vorthari: "hostile", syndari: "neutral", luminex: "hostile", drokan: "allied", nyxari: "hostile", velosian: "neutral", umbrath: "allied" },
  },
  {
    id: "syndari",
    name: "Syndari",
    homeworld: "Syndara, Lethis Nebula",
    biology: "Slender humanoids with elongated fingers and bioluminescent markings. Naturally empathic and long-lived, up to 400 years.",
    culture: "Mercantile guilds controlling vast trade networks. Syndari prize information, subtlety, and economic leverage.",
    technology: "Masters of stealth drives, sensor jamming, and high-frequency energy lances. Prefer evasion to direct combat.",
    traits: ["Shrewd", "Perceptive", "Patient", "Elusive"],
    relations: { terran: "neutral", vorthari: "neutral", krellax: "neutral", luminex: "allied", drokan: "neutral", nyxari: "neutral", velosian: "hostile", umbrath: "neutral" },
  },
  {
    id: "luminex",
    name: "Luminex",
    homeworld: "Aethon Core, Radiant Cluster",
    biology: "Energy-based consciousness contained within crystalline exo-frames. Immune to biological threats and radiation.",
    culture: "A collective intelligence with distributed memory nodes. Decisions are made by consensus resonance rather than hierarchy.",
    technology: "Pinnacle of energy weaponry and force fields. Graviton lances and quantum shields define their fleet doctrine.",
    traits: ["Analytical", "Ancient", "Serene", "Incomprehensible"],
    relations: { terran: "allied", vorthari: "neutral", krellax: "hostile", syndari: "allied", drokan: "hostile", nyxari: "neutral", velosian: "neutral", umbrath: "hostile" },
  },
  {
    id: "drokan",
    name: "Drokan",
    homeworld: "Drok, Ashfeld System",
    biology: "Squat, heavily-muscled beings with rock-like skin capable of withstanding vacuum for short periods.",
    culture: "Mining guilds and forge clans dominate Drokan society. They control the majority of rare mineral extraction in the outer rim.",
    technology: "Expert engineers specialising in mining rigs, industrial haulers, and mass driver cannons repurposed for combat.",
    traits: ["Stubborn", "Resourceful", "Greedy", "Dependable"],
    relations: { terran: "neutral", vorthari: "hostile", krellax: "allied", syndari: "neutral", luminex: "hostile", nyxari: "neutral", velosian: "neutral", umbrath: "neutral" },
  },
  {
    id: "nyxari",
    name: "Nyxari",
    homeworld: "Nyx Veil, Umbra Rift",
    biology: "Shadowy corporeal beings that can partially phase into sub-space, making them difficult to detect and target.",
    culture: "Secretive monastic orders devoted to studying the fabric of spacetime. They share knowledge selectively.",
    technology: "Phase cloaking, sub-space torpedoes, and temporal distortion fields. Among the most feared in combat.",
    traits: ["Mysterious", "Disciplined", "Isolationist", "Scholarly"],
    relations: { terran: "neutral", vorthari: "allied", krellax: "hostile", syndari: "neutral", luminex: "neutral", drokan: "neutral", velosian: "neutral", umbrath: "neutral" },
  },
  {
    id: "velosian",
    name: "Velosian",
    homeworld: "Velox, Swift Star System",
    biology: "Lightweight avian beings with hollow bones and exceptional reflexes. Evolved on a high-gravity world, giving surprising physical endurance.",
    culture: "Competitive racing guilds and aerobatic tournaments define social status. Speed and elegance are prized above all.",
    technology: "Fastest FTL drives in the known galaxy. Their interceptors are nearly impossible to catch but lightly armoured.",
    traits: ["Daring", "Competitive", "Agile", "Reckless"],
    relations: { terran: "allied", vorthari: "neutral", krellax: "neutral", syndari: "hostile", luminex: "neutral", drokan: "neutral", nyxari: "neutral", umbrath: "neutral" },
  },
  {
    id: "umbrath",
    name: "Umbrath",
    homeworld: "Unknown – The Void Expanse",
    biology: "Entities of compressed dark matter with no fixed biological form. Their true nature remains a mystery to all catalogued species.",
    culture: "Goal and motivation unknown. They appear from deep space, harvest resources or lifeforms, and withdraw without communication.",
    technology: "Anti-matter weaponry of devastating scale. Their vessels absorb conventional sensor scans and resist standard shield frequencies.",
    traits: ["Alien", "Inscrutable", "Terrifying", "Overwhelming"],
    relations: { terran: "hostile", vorthari: "hostile", krellax: "allied", syndari: "neutral", luminex: "hostile", drokan: "neutral", nyxari: "neutral", velosian: "neutral" },
  },
];
