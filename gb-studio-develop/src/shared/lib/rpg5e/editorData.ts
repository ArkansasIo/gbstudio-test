export type RPGCategoryKey =
  | "maps"
  | "dungeons"
  | "zones"
  | "biomes"
  | "weapons"
  | "armors"
  | "items"
  | "monsters"
  | "characters"
  | "classes"
  | "races"
  | "spells"
  | "quests"
  | "npcs"
  | "factions"
  | "encounters"
  | "lootTables";

export interface RPGEntry {
  id: string;
  name: string;
  notes: string;
  tags: string[];
  fields: Record<string, string | number | boolean>;
}

export type RPGCategoryData = Record<RPGCategoryKey, RPGEntry[]>;

export interface RPG5EData {
  version: 1;
  categories: RPGCategoryData;
}

export const rpgCategoryKeys: RPGCategoryKey[] = [
  "maps",
  "dungeons",
  "zones",
  "biomes",
  "weapons",
  "armors",
  "items",
  "monsters",
  "characters",
  "classes",
  "races",
  "spells",
  "quests",
  "npcs",
  "factions",
  "encounters",
  "lootTables",
];

export const createDefaultRPG5EData = (): RPG5EData => ({
  version: 1,
  categories: {
    maps: [],
    dungeons: [],
    zones: [],
    biomes: [],
    weapons: [],
    armors: [],
    items: [],
    monsters: [],
    characters: [],
    classes: [],
    races: [],
    spells: [],
    quests: [],
    npcs: [],
    factions: [],
    encounters: [],
    lootTables: [],
  },
});

const sanitizeEntry = (input: unknown): RPGEntry | null => {
  if (!input || typeof input !== "object") {
    return null;
  }
  const value = input as Partial<RPGEntry>;
  const id = typeof value.id === "string" ? value.id : "";
  const name = typeof value.name === "string" ? value.name : "New Entry";
  const notes = typeof value.notes === "string" ? value.notes : "";
  const tags = Array.isArray(value.tags)
    ? value.tags.filter((v): v is string => typeof v === "string")
    : [];

  const fieldsRecord: Record<string, string | number | boolean> = {};
  const rawFields = value.fields;
  if (rawFields && typeof rawFields === "object") {
    Object.entries(rawFields).forEach(([key, fieldValue]) => {
      if (
        typeof fieldValue === "string" ||
        typeof fieldValue === "number" ||
        typeof fieldValue === "boolean"
      ) {
        fieldsRecord[key] = fieldValue;
      }
    });
  }

  if (!id) {
    return null;
  }

  return {
    id,
    name,
    notes,
    tags,
    fields: fieldsRecord,
  };
};

export const coerceRPG5EData = (input: unknown): RPG5EData => {
  const fallback = createDefaultRPG5EData();
  if (!input || typeof input !== "object") {
    return fallback;
  }

  const data = input as Partial<RPG5EData>;
  const categories = data.categories;

  if (!categories || typeof categories !== "object") {
    return fallback;
  }

  const next = createDefaultRPG5EData();
  rpgCategoryKeys.forEach((key) => {
    const entries = (categories as Partial<RPGCategoryData>)[key];
    if (Array.isArray(entries)) {
      next.categories[key] = entries
        .map((entry) => sanitizeEntry(entry))
        .filter((entry): entry is RPGEntry => !!entry);
    }
  });

  return next;
};
