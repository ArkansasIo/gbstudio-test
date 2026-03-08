export type SciFiShipClass =
  | "fighter"
  | "corvette"
  | "frigate"
  | "destroyer"
  | "cruiser"
  | "battlecruiser"
  | "carrier"
  | "dreadnought"
  | "hauler"
  | "scout";

export interface SciFiShipStats {
  hull: number;
  shields: number;
  speed: number;
  maneuverability: number;
  cargoCapacity: number;
}

export interface SciFiShipDefinition {
  id: string;
  name: string;
  class: SciFiShipClass;
  faction: string;
  stats: SciFiShipStats;
  weapons: string[];
  crewCapacity: number;
  description: string;
}

export const SCIFI_SHIPS: SciFiShipDefinition[] = [
  {
    id: "aurora-interceptor",
    name: "Aurora Interceptor",
    class: "fighter",
    faction: "terran",
    stats: { hull: 120, shields: 80, speed: 95, maneuverability: 90, cargoCapacity: 5 },
    weapons: ["Dual Railgun Pods", "Short-range Plasma Launcher"],
    crewCapacity: 1,
    description: "The backbone of Terran aerospace defence. Fast, nimble, and equipped for both interception and strafing runs.",
  },
  {
    id: "vanguard-corvette",
    name: "Vanguard Corvette",
    class: "corvette",
    faction: "terran",
    stats: { hull: 350, shields: 280, speed: 75, maneuverability: 65, cargoCapacity: 40 },
    weapons: ["Twin Plasma Cannons", "Point Defense Turrets x2", "Torpedo Bay x1"],
    crewCapacity: 12,
    description: "A versatile patrol and escort vessel, common throughout Terran Federation border systems.",
  },
  {
    id: "halcyon-frigate",
    name: "Halcyon-class Frigate",
    class: "frigate",
    faction: "terran",
    stats: { hull: 800, shields: 600, speed: 60, maneuverability: 45, cargoCapacity: 150 },
    weapons: ["Railgun Battery x2", "Missile Tubes x4", "Point Defense Grid"],
    crewCapacity: 65,
    description: "The Terran workhorse for system patrol, convoy escort, and rapid response operations.",
  },
  {
    id: "sentinel-destroyer",
    name: "Sentinel Destroyer",
    class: "destroyer",
    faction: "terran",
    stats: { hull: 1800, shields: 1400, speed: 50, maneuverability: 35, cargoCapacity: 200 },
    weapons: ["Heavy Railgun Array", "Plasma Torpedo Launchers x2", "Anti-Fighter Grid", "EMP Burst Cannon"],
    crewCapacity: 180,
    description: "Designed for fleet engagement, the Sentinel excels at stripping shields from capital ships before missile runs.",
  },
  {
    id: "hive-spear",
    name: "Hive Spear",
    class: "fighter",
    faction: "vorthari",
    stats: { hull: 90, shields: 140, speed: 85, maneuverability: 80, cargoCapacity: 2 },
    weapons: ["Particle Beam Lances x2"],
    crewCapacity: 1,
    description: "A Vorthari precision strike fighter. Its particle beam lances are devastatingly accurate at medium range.",
  },
  {
    id: "carapace-cruiser",
    name: "Carapace Cruiser",
    class: "cruiser",
    faction: "vorthari",
    stats: { hull: 4200, shields: 3800, speed: 40, maneuverability: 25, cargoCapacity: 500 },
    weapons: ["Particle Beam Battery x4", "Bio-Seeker Missiles x6", "Ablative Shield Burst Emitter"],
    crewCapacity: 600,
    description: "The primary line warship of the Vorthari fleet. Its bio-integrated hull provides both exceptional resilience and adaptability.",
  },
  {
    id: "iron-maw-dreadnought",
    name: "Iron Maw Dreadnought",
    class: "dreadnought",
    faction: "krellax",
    stats: { hull: 15000, shields: 5000, speed: 20, maneuverability: 10, cargoCapacity: 2000 },
    weapons: ["Plasma Siege Cannons x8", "Mass Driver Arrays x4", "Boarding Assault Bays x6", "Flak Batteries x12"],
    crewCapacity: 4000,
    description: "A terrifying symbol of Krellax military might. Built for planetary assault and fleet annihilation, not manoeuvring.",
  },
  {
    id: "shadow-lance",
    name: "Shadow Lance",
    class: "corvette",
    faction: "syndari",
    stats: { hull: 280, shields: 220, speed: 88, maneuverability: 82, cargoCapacity: 60 },
    weapons: ["High-Frequency Energy Lances x2", "Sensor Jammer Array"],
    crewCapacity: 8,
    description: "Syndari stealth corvette. Near-invisible to standard sensors and lethal in ambush engagements.",
  },
  {
    id: "prism-dreadnought",
    name: "Prism Dreadnought",
    class: "dreadnought",
    faction: "luminex",
    stats: { hull: 12000, shields: 18000, speed: 30, maneuverability: 15, cargoCapacity: 800 },
    weapons: ["Graviton Lance Array x6", "Quantum Shield Projectors x4", "Photon Cascade Emitter"],
    crewCapacity: 200,
    description: "A Luminex capital ship of devastating power. Its quantum shields exceed the hull strength of most conventional warships.",
  },
  {
    id: "ore-king-hauler",
    name: "Ore King Heavy Hauler",
    class: "hauler",
    faction: "drokan",
    stats: { hull: 2500, shields: 800, speed: 25, maneuverability: 8, cargoCapacity: 8000 },
    weapons: ["Mass Driver Turret x2", "Mining Laser Array"],
    crewCapacity: 40,
    description: "The Drokan industrial titan of deep-space mining. Its mass driver turrets double as crude but effective defensive weapons.",
  },
  {
    id: "phase-wraith",
    name: "Phase Wraith",
    class: "frigate",
    faction: "nyxari",
    stats: { hull: 600, shields: 400, speed: 70, maneuverability: 75, cargoCapacity: 80 },
    weapons: ["Sub-Space Torpedoes x4", "Phase Disruptor Emitter", "Temporal Distortion Field Generator"],
    crewCapacity: 24,
    description: "The Nyxari Phase Wraith can phase into sub-space to become temporarily impervious, reappearing behind enemy formations.",
  },
  {
    id: "velocity-blade",
    name: "Velocity Blade Interceptor",
    class: "fighter",
    faction: "velosian",
    stats: { hull: 80, shields: 60, speed: 99, maneuverability: 98, cargoCapacity: 3 },
    weapons: ["Sprint Plasma Needlers x4"],
    crewCapacity: 1,
    description: "The fastest military craft in catalogued space. Velosian pilots win through attrition, speed, and sheer audacity.",
  },
  {
    id: "terran-carrier",
    name: "Olympus Carrier",
    class: "carrier",
    faction: "terran",
    stats: { hull: 8000, shields: 5000, speed: 28, maneuverability: 12, cargoCapacity: 1200 },
    weapons: ["Point Defense Grid x8", "Railgun Batteries x2", "Fighter Bay Capacity x48"],
    crewCapacity: 1800,
    description: "The Terran fleet carrier deploys up to 48 fighter craft in multi-wave assault patterns. Its fighter wings are its primary weapon.",
  },
  {
    id: "vorthari-scout",
    name: "Vorthari Resonance Scout",
    class: "scout",
    faction: "vorthari",
    stats: { hull: 160, shields: 120, speed: 90, maneuverability: 85, cargoCapacity: 20 },
    weapons: ["Particle Micro-Lances x2"],
    crewCapacity: 3,
    description: "A deep-range scout used by the Vorthari to map new systems and relay battle intelligence to the Matriarch Council.",
  },
  {
    id: "krellax-assault-boarding",
    name: "Krellax Ravager Boarding Ship",
    class: "destroyer",
    faction: "krellax",
    stats: { hull: 2200, shields: 1200, speed: 45, maneuverability: 30, cargoCapacity: 400 },
    weapons: ["Boarding Lance Cannons x4", "Plasma Burst Mortars x2", "Breach Drill Arrays x3"],
    crewCapacity: 500,
    description: "Designed for violent boarding actions. The Ravager attaches directly to enemy hulls and deploys Krellax warriors into the breach.",
  },
];
