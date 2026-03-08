/**
 * MAGA – Name Lists & Generation
 *
 * Curated lists of first names, last names, and epithets for each
 * racial/cultural origin, plus a lightweight generator function that
 * assembles a full MAGACharacterName from them.
 */

import type { MAGACharacterName, MAGANameOrigin } from './types';

// ============================================================================
// NAME LISTS
// ============================================================================

/** First names indexed by origin. */
export const firstNames: Record<MAGANameOrigin, string[]> = {
  human: [
    'Aldric', 'Beren', 'Caden', 'Daven', 'Edric', 'Faris', 'Gareth', 'Hadwyn',
    'Ivor', 'Jasper', 'Kellan', 'Leon', 'Marcus', 'Nolan', 'Oryn', 'Pierce',
    'Quinn', 'Roland', 'Silas', 'Taran', 'Ulric', 'Vance', 'Wren', 'Xavier',
    'Yorick', 'Zane',
    // Female
    'Aelith', 'Brynn', 'Cera', 'Dara', 'Elara', 'Fiona', 'Gwen', 'Hira',
    'Isla', 'Jana', 'Kira', 'Lyra', 'Mara', 'Nessa', 'Orla', 'Petra',
    'Quin', 'Reva', 'Sera', 'Tara', 'Una', 'Vera', 'Wyla', 'Xara',
    'Yara', 'Zora',
  ],
  elvish: [
    'Aelindra', 'Caladwen', 'Eirindel', 'Faelthas', 'Galadhon', 'Halethir',
    'Ithilwen', 'Laerothel', 'Miralith', 'Nolindë', 'Orodreth', 'Pelindor',
    'Quilindë', 'Rúmileth', 'Sildaneth', 'Thalindra', 'Úrithiel', 'Vardamir',
    'Wyndelith', 'Xalaneth', 'Yavanniel', 'Zílindë',
    // Male
    'Aranion', 'Calethrin', 'Daerion', 'Elarindë', 'Falathrin', 'Gilindor',
    'Halindor', 'Ithriniel', 'Lindoriel', 'Mirëdhel',
  ],
  dwarven: [
    'Aldrek', 'Bofrik', 'Dolgrim', 'Embrek', 'Fundrak', 'Gundrek', 'Halmek',
    'Ironbek', 'Jordak', 'Kramdur', 'Lordak', 'Mordek', 'Naldrek', 'Olfrek',
    'Pulgor', 'Qundrek', 'Roldak', 'Stormek', 'Tordrak', 'Uldrek', 'Vordak',
    // Female
    'Ambra', 'Bera', 'Dorga', 'Embra', 'Fjelda', 'Gruda', 'Helga', 'Ingra',
    'Jorga', 'Keldra', 'Lordga', 'Mirga',
  ],
  orcish: [
    'Azgrath', 'Bruktar', 'Crugmor', 'Dargoth', 'Ezrak', 'Flugrash', 'Gorgath',
    'Hraktur', 'Izrak', 'Jurgoth', 'Krugmak', 'Largoth', 'Morgath', 'Nurgash',
    'Orzak', 'Prugmak', 'Qurgash', 'Rorgoth', 'Skurgath', 'Targak', 'Urgoth',
    'Vorgash', 'Wurgak', 'Xurgoth', 'Yorgash', 'Zugrath',
  ],
  celestial: [
    'Aetharon', 'Brightfel', 'Caelindra', 'Dawnthorn', 'Elariah', 'Firethis',
    'Goldenfall', 'Heliandor', 'Irisel', 'Jubileth', 'Kyriandor', 'Luminath',
    'Morathiel', 'Novindra', 'Orindiel', 'Prismiel', 'Quiandor', 'Radianthas',
    'Solindra', 'Terrafel', 'Urithiel', 'Valorindor', 'Whitethis', 'Xerandor',
    'Yorindra', 'Zephiriel',
  ],
  infernal: [
    'Abyssath', 'Brimorah', 'Cindrak', 'Doomrath', 'Embrath', 'Flamerak',
    'Grimorah', 'Hellrath', 'Ignarak', 'Jinxrath', 'Kindrak', 'Lavarak',
    'Moltenak', 'Nightrak', 'Obsidrak', 'Pyrathak', 'Quakrath', 'Ruinak',
    'Scorchak', 'Tormentrak', 'Umbrak', 'Vilerak', 'Wrathrak', 'Xenrak',
    'Ygrak', 'Zephurak',
  ],
  fae: [
    'Auriel', 'Blossom', 'Cobweb', 'Dewdrop', 'Eventide', 'Frostpetal',
    'Gossamer', 'Hazel', 'Iridessa', 'Juniper', 'Kinderwyn', 'Lavender',
    'Moonwhisper', 'Nightbloom', 'Opalwing', 'Petalwhirl', 'Quartzglow',
    'Rosedawn', 'Silverleaf', 'Thistledown', 'Umberelle', 'Violetmist',
    'Willowwind', 'Xylowyn', 'Yarnweave', 'Zephyrbloom',
  ],
  draconic: [
    'Azkrathos', 'Balzarith', 'Cythriax', 'Drakathon', 'Erixathos',
    'Fyraxith', 'Gorthriax', 'Haxathar', 'Ixathrith', 'Jyxathrak',
    'Kraxithar', 'Lyraxath', 'Myxathor', 'Nyraxith', 'Oxathrax',
    'Pyraxith', 'Qyrathrak', 'Ryxathor', 'Syxathrax', 'Tyraxith',
    'Uxathrith', 'Vyraxath', 'Wyraxith', 'Xyrathrak', 'Yyxathor',
    'Zyraxith',
  ],
};

/** Last names / surnames indexed by origin. */
export const lastNames: Record<MAGANameOrigin, string[]> = {
  human: [
    'Ashveil', 'Blackthorn', 'Coldwater', 'Darkwood', 'Emberstone',
    'Fairweather', 'Goldfield', 'Hardstone', 'Ironwood', 'Jadebrook',
    'Kettlebrook', 'Longmeadow', 'Merriwell', 'Nighthollow', 'Oakenshield',
    'Pinehurst', 'Quickstride', 'Redmoor', 'Silverstream', 'Thorngate',
    'Underhill', 'Vaultwood', 'Windmere', 'Xanbrook', 'Yellowstone',
    'Zephyrhollow',
  ],
  elvish: [
    'Amberleaf', 'Brightmere', 'Crystalwind', 'Dawnsong', 'Elvenmist',
    'Forestdawn', 'Goldensong', 'Highcanopy', 'Iridescent', 'Jadespire',
    'Kindsong', 'Lightweave', 'Moonshadow', 'Nightsong', 'Opalebranch',
    'Petalwind', 'Queenspire', 'Rainmere', 'Starweave', 'Twilightmere',
    'Umberleaf', 'Verdantwind', 'Winterbranch', 'Xylophone', 'Yearning',
    'Zenithleaf',
  ],
  dwarven: [
    'Anvilbrow', 'Boulderback', 'Copperbeard', 'Deepmine', 'Emberfist',
    'Flinthead', 'Goldvein', 'Hammerfall', 'Ironforge', 'Jadepick',
    'Kegbelly', 'Lavaborn', 'Mithrilhelm', 'Needleaxe', 'Orebreaker',
    'Pickhand', 'Quarryborn', 'Rockfist', 'Stonehelm', 'Thunderfist',
    'Underforge', 'Vaultborn', 'Whetstone', 'Xornhelm', 'Yoreaxe',
    'Zincbeard',
  ],
  orcish: [
    'Bloodtusk', 'Crushbone', 'Deathmaw', 'Earthshaker', 'Fleshripper',
    'Goreclaw', 'Heavyfist', 'Ironjaw', 'Jawcracker', 'Killhorn',
    'Legbreaker', 'Meatcleaver', 'Neckchopper', 'Orcenbane', 'Paincaller',
    'Quickslash', 'Ribcrusher', 'Skullbash', 'Thunderfist', 'Uglybrow',
    'Vainhowl', 'Warscream', 'Xarclaw', 'Yarhowl', 'Zugsmash',
  ],
  celestial: [
    'Aurelius', 'Benediction', 'Celestara', 'Divineheart', 'Eternalstar',
    'Faithborne', 'Gloryborn', 'Holyrune', 'Illuminarath', 'Justiceborn',
    'Kindlestar', 'Lightborn', 'Miracleborn', 'Nobleheart', 'Orderborn',
    'Praisesong', 'Quicklight', 'Radiantborn', 'Sanctuara', 'Truthborn',
    'Undimmedstar', 'Victoryborn', 'Wisdomlight', 'Xenithstar', 'Yearnlight',
    'Zenithborn',
  ],
  infernal: [
    'Ashborn', 'Blightcall', 'Cinderclaw', 'Darkpact', 'Emberblight',
    'Flameborn', 'Grimtide', 'Hellpact', 'Infernoborn', 'Jadescorch',
    'Kindlecurse', 'Lavapact', 'Miseryborn', 'Nightcurse', 'Obscureborn',
    'Pyrescorch', 'Quickscorch', 'Ruinborn', 'Scorchrune', 'Tormentcall',
    'Umbrablight', 'Voidborn', 'Wrathpact', 'Xarscorch', 'Yearncurse',
    'Zephyrblight',
  ],
  fae: [
    'Brightpetal', 'Cobwebspun', 'Dewmist', 'Elderbloom', 'Fairyglow',
    'Gossamerwind', 'Honeydew', 'Ivywreath', 'Jadewreath', 'Kindlebloom',
    'Lavenderwind', 'Moonpetal', 'Nightbloom', 'Opalwing', 'Petalfall',
    'Queenbloom', 'Roseglow', 'Starbloom', 'Thistlewisp', 'Umberbloom',
    'Violetglow', 'Willowbloom', 'Xylogloom', 'Yearning', 'Zephyrbloom',
  ],
  draconic: [
    'Ashenwing', 'Blazescale', 'Cindermark', 'Darkscale', 'Emberwing',
    'Fieryscale', 'Goldscale', 'Heatscale', 'Ironscale', 'Jadescale',
    'Kindlescale', 'Lavascale', 'Moltenscale', 'Nightscale', 'Opalscale',
    'Pyrewing', 'Quickscale', 'Rubymark', 'Scorchscale', 'Thunderwing',
    'Umberscale', 'Voidwing', 'Wrathscale', 'Xarscale', 'Yearscale',
    'Zenithwing',
  ],
};

/** Epithets (optional title suffix) for each origin. */
export const epithets: Record<MAGANameOrigin, string[]> = {
  human: [
    'the Unyielding', 'the Resolute', 'Ironsides', 'the Brave', 'of the North',
    'the Steadfast', 'Quickblade', 'the Just', 'the Bold', 'Strongheart',
    'the Elder', 'the Young', 'Goldhand', 'Swiftfoot', 'the Wise',
  ],
  elvish: [
    'of the Silver Moon', 'the Timeless', 'Starborn', 'the Ancient',
    'of the Eternal Forest', 'Lightweaver', 'the Serene', 'Moonwalker',
    'Songweaver', 'the Immortal',
  ],
  dwarven: [
    'Deepdelver', 'of the Mountain', 'Ironhands', 'Stoneborn', 'the Stubborn',
    'of the Deep Forge', 'Goldvein', 'Rockbreaker', 'the Stout', 'Anvilarm',
  ],
  orcish: [
    'Bloodcaller', 'the Savage', 'Ironjaw', 'the Unmerciful', 'Warborn',
    'the Destroyer', 'Bonecrusher', 'of the Red Clan', 'the Fearless', 'Skullsplitter',
  ],
  celestial: [
    'of the High Heavens', 'the Enlightened', 'Lightbearer', 'the Blessed',
    'Starborn', 'the Radiant', 'Dawnbringer', 'the Hallowed', 'Soulfire', 'the Pure',
  ],
  infernal: [
    'the Cursed', 'of the Abyss', 'Hellborn', 'the Corrupted', 'Doomcaller',
    'the Forsaken', 'Ashborn', 'of the Dark Flame', 'Voidwalker', 'the Malevolent',
  ],
  fae: [
    'of the Twilight Court', 'Dreamweaver', 'the Gossamer', 'Moonkissed',
    'of the Wild Bloom', 'Starwhisper', 'the Whimsical', 'Petalborn',
    'Shadowdancer', 'of the Enchanted Grove',
  ],
  draconic: [
    'the Ancient', 'Flameborn', 'of the Dragon Kin', 'the Scaled',
    'Emberclaw', 'the Great Wyrm', 'Ashwing', 'of the Eternal Flame',
    'the Mighty', 'Scorchwing',
  ],
};

// ============================================================================
// NAME GENERATION
// ============================================================================

/**
 * Deterministic seeded pseudo-random number generator (LCG).
 * Used so that the same seed always produces the same name.
 */
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

function pickFrom<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

/**
 * Generates a MAGACharacterName for the given origin.
 *
 * @param origin      - The racial/cultural origin to draw names from.
 * @param includeEpithet - Whether to append a random epithet (default: true).
 * @param seed        - Optional numeric seed for reproducible results.
 * @returns           A fully populated MAGACharacterName object.
 */
export function generateName(
  origin: MAGANameOrigin,
  includeEpithet = true,
  seed?: number
): MAGACharacterName {
  const rng = lcg(seed ?? (Date.now() & 0xffffffff));

  const firstName = pickFrom(firstNames[origin], rng);
  const lastName = pickFrom(lastNames[origin], rng);
  const epithet = includeEpithet
    ? pickFrom(epithets[origin], rng)
    : undefined;

  const fullName = epithet
    ? `${firstName} ${lastName}, ${epithet}`
    : `${firstName} ${lastName}`;

  return { firstName, lastName, epithet, fullName, origin };
}

/**
 * Returns a random origin from all available MAGA name origins.
 *
 * @param seed - Optional numeric seed.
 */
export function randomOrigin(seed?: number): MAGANameOrigin {
  const allOrigins: MAGANameOrigin[] = [
    'human', 'elvish', 'dwarven', 'orcish',
    'celestial', 'infernal', 'fae', 'draconic',
  ];
  const rng = lcg(seed ?? (Date.now() & 0xffffffff));
  return pickFrom(allOrigins, rng);
}

// ============================================================================
// CURATED NPC NAMES (pre-built for notable characters)
// ============================================================================

/** Pre-built names for notable MAGA NPCs and example characters. */
export const notableNames: MAGACharacterName[] = [
  { firstName: 'Aldric', lastName: 'Ashveil', epithet: 'the Unyielding', fullName: 'Aldric Ashveil, the Unyielding', origin: 'human' },
  { firstName: 'Aelindra', lastName: 'Moonshadow', epithet: 'Starborn', fullName: 'Aelindra Moonshadow, Starborn', origin: 'elvish' },
  { firstName: 'Gundrek', lastName: 'Ironforge', epithet: 'of the Deep Forge', fullName: 'Gundrek Ironforge, of the Deep Forge', origin: 'dwarven' },
  { firstName: 'Morgath', lastName: 'Bloodtusk', epithet: 'the Destroyer', fullName: 'Morgath Bloodtusk, the Destroyer', origin: 'orcish' },
  { firstName: 'Luminath', lastName: 'Radiantborn', epithet: 'the Blessed', fullName: 'Luminath Radiantborn, the Blessed', origin: 'celestial' },
  { firstName: 'Cindrak', lastName: 'Ashborn', epithet: 'of the Abyss', fullName: 'Cindrak Ashborn, of the Abyss', origin: 'infernal' },
  { firstName: 'Moonwhisper', lastName: 'Petalfall', epithet: 'of the Twilight Court', fullName: 'Moonwhisper Petalfall, of the Twilight Court', origin: 'fae' },
  { firstName: 'Drakathon', lastName: 'Emberwing', epithet: 'the Great Wyrm', fullName: 'Drakathon Emberwing, the Great Wyrm', origin: 'draconic' },
];
