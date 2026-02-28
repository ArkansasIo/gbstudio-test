// RPGSoundEffects.ts
// Library of RPG sound effects, sounds, and music classes

export type SoundCategory = "effect" | "music" | "ambient" | "voice";

export interface RPGSound {
  id: string;
  name: string;
  category: SoundCategory;
  file: string;
  description?: string;
}

export class RPGSoundEffect implements RPGSound {
  id: string;
  name: string;
  category: SoundCategory = "effect";
  file: string;
  description?: string;

  constructor(id: string, name: string, file: string, description?: string) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.description = description;
  }
}

export class RPGMusic implements RPGSound {
  id: string;
  name: string;
  category: SoundCategory = "music";
  file: string;
  description?: string;

  constructor(id: string, name: string, file: string, description?: string) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.description = description;
  }
}

export class RPGAmbientSound implements RPGSound {
  id: string;
  name: string;
  category: SoundCategory = "ambient";
  file: string;
  description?: string;

  constructor(id: string, name: string, file: string, description?: string) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.description = description;
  }
}

export class RPGVoiceSound implements RPGSound {
  id: string;
  name: string;
  category: SoundCategory = "voice";
  file: string;
  description?: string;

  constructor(id: string, name: string, file: string, description?: string) {
    this.id = id;
    this.name = name;
    this.file = file;
    this.description = description;
  }
}

// Example sound effect list (expand to 200+ as needed)
export const RPG_SOUND_LIBRARY: RPGSound[] = [
  new RPGSoundEffect("sfx_attack", "Attack", "audio/sfx_attack.wav", "Sword attack sound"),
  new RPGSoundEffect("sfx_magic", "Magic", "audio/sfx_magic.wav", "Magic spell sound"),
  new RPGSoundEffect("sfx_heal", "Heal", "audio/sfx_heal.wav", "Healing sound"),
  new RPGSoundEffect("sfx_item", "Item", "audio/sfx_item.wav", "Item pickup sound"),
  new RPGSoundEffect("sfx_levelup", "Level Up", "audio/sfx_levelup.wav", "Level up sound"),
  new RPGSoundEffect("sfx_open", "Open", "audio/sfx_open.wav", "Door opening sound"),
  new RPGSoundEffect("sfx_close", "Close", "audio/sfx_close.wav", "Door closing sound"),
  new RPGSoundEffect("sfx_step", "Step", "audio/sfx_step.wav", "Footstep sound"),
  new RPGSoundEffect("sfx_jump", "Jump", "audio/sfx_jump.wav", "Jump sound"),
  new RPGSoundEffect("sfx_fall", "Fall", "audio/sfx_fall.wav", "Falling sound"),
  new RPGSoundEffect("sfx_explosion", "Explosion", "audio/sfx_explosion.wav", "Explosion sound"),
  new RPGSoundEffect("sfx_fire", "Fire", "audio/sfx_fire.wav", "Fireball sound"),
  new RPGSoundEffect("sfx_water", "Water", "audio/sfx_water.wav", "Water splash sound"),
  new RPGSoundEffect("sfx_wind", "Wind", "audio/sfx_wind.wav", "Wind sound"),
  new RPGSoundEffect("sfx_lightning", "Lightning", "audio/sfx_lightning.wav", "Lightning sound"),
  new RPGSoundEffect("sfx_poison", "Poison", "audio/sfx_poison.wav", "Poison effect sound"),
  new RPGSoundEffect("sfx_buff", "Buff", "audio/sfx_buff.wav", "Buff effect sound"),
  new RPGSoundEffect("sfx_debuff", "Debuff", "audio/sfx_debuff.wav", "Debuff effect sound"),
  new RPGSoundEffect("sfx_save", "Save", "audio/sfx_save.wav", "Save game sound"),
  new RPGSoundEffect("sfx_load", "Load", "audio/sfx_load.wav", "Load game sound"),
  new RPGSoundEffect("sfx_menu", "Menu", "audio/sfx_menu.wav", "Menu open sound"),
  new RPGSoundEffect("sfx_select", "Select", "audio/sfx_select.wav", "Menu select sound"),
  new RPGSoundEffect("sfx_cancel", "Cancel", "audio/sfx_cancel.wav", "Menu cancel sound"),
  new RPGSoundEffect("sfx_win", "Win", "audio/sfx_win.wav", "Victory sound"),
  new RPGSoundEffect("sfx_lose", "Lose", "audio/sfx_lose.wav", "Defeat sound"),
  new RPGSoundEffect("sfx_enemy", "Enemy", "audio/sfx_enemy.wav", "Enemy alert sound"),
  new RPGSoundEffect("sfx_boss", "Boss", "audio/sfx_boss.wav", "Boss alert sound"),
  new RPGSoundEffect("sfx_critical", "Critical", "audio/sfx_critical.wav", "Critical hit sound"),
  new RPGSoundEffect("sfx_miss", "Miss", "audio/sfx_miss.wav", "Miss attack sound"),
  new RPGSoundEffect("sfx_block", "Block", "audio/sfx_block.wav", "Block sound"),
  new RPGSoundEffect("sfx_escape", "Escape", "audio/sfx_escape.wav", "Escape sound"),
  new RPGSoundEffect("sfx_trap", "Trap", "audio/sfx_trap.wav", "Trap sound"),
  new RPGSoundEffect("sfx_unlock", "Unlock", "audio/sfx_unlock.wav", "Unlock sound"),
  new RPGSoundEffect("sfx_lock", "Lock", "audio/sfx_lock.wav", "Lock sound"),
  new RPGSoundEffect("sfx_coin", "Coin", "audio/sfx_coin.wav", "Coin pickup sound"),
  new RPGSoundEffect("sfx_gold", "Gold", "audio/sfx_gold.wav", "Gold pickup sound"),
  new RPGSoundEffect("sfx_shop", "Shop", "audio/sfx_shop.wav", "Shop sound"),
  new RPGSoundEffect("sfx_trade", "Trade", "audio/sfx_trade.wav", "Trade sound"),
  new RPGSoundEffect("sfx_quest", "Quest", "audio/sfx_quest.wav", "Quest sound"),
  new RPGSoundEffect("sfx_complete", "Complete", "audio/sfx_complete.wav", "Quest complete sound"),
  new RPGSoundEffect("sfx_fail", "Fail", "audio/sfx_fail.wav", "Quest fail sound"),
  new RPGSoundEffect("sfx_talk", "Talk", "audio/sfx_talk.wav", "NPC talk sound"),
  new RPGSoundEffect("sfx_npc", "NPC", "audio/sfx_npc.wav", "NPC sound"),
  new RPGSoundEffect("sfx_party", "Party", "audio/sfx_party.wav", "Party join sound"),
  new RPGSoundEffect("sfx_split", "Split", "audio/sfx_split.wav", "Party split sound"),
  new RPGSoundEffect("sfx_map", "Map", "audio/sfx_map.wav", "Map open sound"),
  new RPGSoundEffect("sfx_world", "World", "audio/sfx_world.wav", "World map sound"),
  new RPGSoundEffect("sfx_forest", "Forest", "audio/sfx_forest.wav", "Forest ambient sound"),
  new RPGSoundEffect("sfx_cave", "Cave", "audio/sfx_cave.wav", "Cave ambient sound"),
  new RPGSoundEffect("sfx_town", "Town", "audio/sfx_town.wav", "Town ambient sound"),
  new RPGSoundEffect("sfx_castle", "Castle", "audio/sfx_castle.wav", "Castle ambient sound"),
  new RPGSoundEffect("sfx_dungeon", "Dungeon", "audio/sfx_dungeon.wav", "Dungeon ambient sound"),
  new RPGSoundEffect("sfx_field", "Field", "audio/sfx_field.wav", "Field ambient sound"),
  new RPGSoundEffect("sfx_rain", "Rain", "audio/sfx_rain.wav", "Rain sound"),
  new RPGSoundEffect("sfx_thunder", "Thunder", "audio/sfx_thunder.wav", "Thunder sound"),
  new RPGSoundEffect("sfx_snow", "Snow", "audio/sfx_snow.wav", "Snow sound"),
  new RPGSoundEffect("sfx_sun", "Sun", "audio/sfx_sun.wav", "Sun sound"),
  new RPGSoundEffect("sfx_night", "Night", "audio/sfx_night.wav", "Night ambient sound"),
  new RPGSoundEffect("sfx_day", "Day", "audio/sfx_day.wav", "Day ambient sound"),
  new RPGSoundEffect("sfx_morning", "Morning", "audio/sfx_morning.wav", "Morning ambient sound"),
  new RPGSoundEffect("sfx_evening", "Evening", "audio/sfx_evening.wav", "Evening ambient sound"),
  new RPGSoundEffect("sfx_battle", "Battle", "audio/sfx_battle.wav", "Battle sound"),
  new RPGSoundEffect("sfx_victory", "Victory", "audio/sfx_victory.wav", "Victory sound"),
  new RPGSoundEffect("sfx_defeat", "Defeat", "audio/sfx_defeat.wav", "Defeat sound"),
  new RPGSoundEffect("sfx_fanfare", "Fanfare", "audio/sfx_fanfare.wav", "Fanfare sound"),
  new RPGSoundEffect("sfx_alarm", "Alarm", "audio/sfx_alarm.wav", "Alarm sound"),
  new RPGSoundEffect("sfx_clock", "Clock", "audio/sfx_clock.wav", "Clock sound"),
  new RPGSoundEffect("sfx_time", "Time", "audio/sfx_time.wav", "Time passing sound"),
  new RPGSoundEffect("sfx_teleport", "Teleport", "audio/sfx_teleport.wav", "Teleport sound"),
  new RPGSoundEffect("sfx_portal", "Portal", "audio/sfx_portal.wav", "Portal sound"),
  new RPGSoundEffect("sfx_flight", "Flight", "audio/sfx_flight.wav", "Flying sound"),
  new RPGSoundEffect("sfx_transform", "Transform", "audio/sfx_transform.wav", "Transformation sound"),
  new RPGSoundEffect("sfx_shield", "Shield", "audio/sfx_shield.wav", "Shield sound"),
  new RPGSoundEffect("sfx_armor", "Armor", "audio/sfx_armor.wav", "Armor equip sound"),
  new RPGSoundEffect("sfx_weapon", "Weapon", "audio/sfx_weapon.wav", "Weapon equip sound"),
  new RPGSoundEffect("sfx_spell", "Spell", "audio/sfx_spell.wav", "Spell cast sound"),
  new RPGSoundEffect("sfx_scroll", "Scroll", "audio/sfx_scroll.wav", "Scroll read sound"),
  new RPGSoundEffect("sfx_book", "Book", "audio/sfx_book.wav", "Book open sound"),
  new RPGSoundEffect("sfx_potion", "Potion", "audio/sfx_potion.wav", "Potion drink sound"),
  new RPGSoundEffect("sfx_food", "Food", "audio/sfx_food.wav", "Food eat sound"),
  new RPGSoundEffect("sfx_drink", "Drink", "audio/sfx_drink.wav", "Drink sound"),
  new RPGSoundEffect("sfx_sleep", "Sleep", "audio/sfx_sleep.wav", "Sleep sound"),
  new RPGSoundEffect("sfx_wake", "Wake", "audio/sfx_wake.wav", "Wake up sound"),
  new RPGSoundEffect("sfx_dream", "Dream", "audio/sfx_dream.wav", "Dream sound"),
  new RPGSoundEffect("sfx_ghost", "Ghost", "audio/sfx_ghost.wav", "Ghost sound"),
  new RPGSoundEffect("sfx_zombie", "Zombie", "audio/sfx_zombie.wav", "Zombie sound"),
  new RPGSoundEffect("sfx_dragon", "Dragon", "audio/sfx_dragon.wav", "Dragon sound"),
  new RPGSoundEffect("sfx_monster", "Monster", "audio/sfx_monster.wav", "Monster sound"),
  new RPGSoundEffect("sfx_pet", "Pet", "audio/sfx_pet.wav", "Pet sound"),
  new RPGSoundEffect("sfx_bird", "Bird", "audio/sfx_bird.wav", "Bird sound"),
  new RPGSoundEffect("sfx_animal", "Animal", "audio/sfx_animal.wav", "Animal sound"),
  new RPGSoundEffect("sfx_insect", "Insect", "audio/sfx_insect.wav", "Insect sound"),
  new RPGSoundEffect("sfx_fish", "Fish", "audio/sfx_fish.wav", "Fish sound"),
  new RPGSoundEffect("sfx_horse", "Horse", "audio/sfx_horse.wav", "Horse sound"),
  new RPGSoundEffect("sfx_carriage", "Carriage", "audio/sfx_carriage.wav", "Carriage sound"),
  new RPGSoundEffect("sfx_ship", "Ship", "audio/sfx_ship.wav", "Ship sound"),
  new RPGSoundEffect("sfx_train", "Train", "audio/sfx_train.wav", "Train sound"),
  new RPGSoundEffect("sfx_airship", "Airship", "audio/sfx_airship.wav", "Airship sound"),
  new RPGSoundEffect("sfx_cart", "Cart", "audio/sfx_cart.wav", "Cart sound"),
  new RPGSoundEffect("sfx_bell", "Bell", "audio/sfx_bell.wav", "Bell sound"),
  new RPGSoundEffect("sfx_whistle", "Whistle", "audio/sfx_whistle.wav", "Whistle sound"),
  new RPGSoundEffect("sfx_horn", "Horn", "audio/sfx_horn.wav", "Horn sound"),
  new RPGSoundEffect("sfx_gong", "Gong", "audio/sfx_gong.wav", "Gong sound"),
  new RPGSoundEffect("sfx_flute", "Flute", "audio/sfx_flute.wav", "Flute sound"),
  new RPGSoundEffect("sfx_drum", "Drum", "audio/sfx_drum.wav", "Drum sound"),
  new RPGSoundEffect("sfx_guitar", "Guitar", "audio/sfx_guitar.wav", "Guitar sound"),
  new RPGSoundEffect("sfx_piano", "Piano", "audio/sfx_piano.wav", "Piano sound"),
  new RPGSoundEffect("sfx_violin", "Violin", "audio/sfx_violin.wav", "Violin sound"),
  new RPGSoundEffect("sfx_trumpet", "Trumpet", "audio/sfx_trumpet.wav", "Trumpet sound"),
  new RPGSoundEffect("sfx_saxophone", "Saxophone", "audio/sfx_saxophone.wav", "Saxophone sound"),
  new RPGSoundEffect("sfx_organ", "Organ", "audio/sfx_organ.wav", "Organ sound"),
  new RPGSoundEffect("sfx_harp", "Harp", "audio/sfx_harp.wav", "Harp sound"),
  new RPGSoundEffect("sfx_cymbal", "Cymbal", "audio/sfx_cymbal.wav", "Cymbal sound"),
  new RPGSoundEffect("sfx_tambourine", "Tambourine", "audio/sfx_tambourine.wav", "Tambourine sound"),
  new RPGSoundEffect("sfx_xylophone", "Xylophone", "audio/sfx_xylophone.wav", "Xylophone sound"),
  new RPGSoundEffect("sfx_maracas", "Maracas", "audio/sfx_maracas.wav", "Maracas sound"),
  new RPGSoundEffect("sfx_triangle", "Triangle", "audio/sfx_triangle.wav", "Triangle sound"),
  new RPGSoundEffect("sfx_conga", "Conga", "audio/sfx_conga.wav", "Conga sound"),
  new RPGSoundEffect("sfx_bongo", "Bongo", "audio/sfx_bongo.wav", "Bongo sound"),
  new RPGSoundEffect("sfx_clap", "Clap", "audio/sfx_clap.wav", "Clap sound"),
  new RPGSoundEffect("sfx_snap", "Snap", "audio/sfx_snap.wav", "Snap sound"),
  new RPGSoundEffect("sfx_click", "Click", "audio/sfx_click.wav", "Click sound"),
  new RPGSoundEffect("sfx_tick", "Tick", "audio/sfx_tick.wav", "Tick sound"),
  new RPGSoundEffect("sfx_pop", "Pop", "audio/sfx_pop.wav", "Pop sound"),
  new RPGSoundEffect("sfx_ping", "Ping", "audio/sfx_ping.wav", "Ping sound"),
  new RPGSoundEffect("sfx_beep", "Beep", "audio/sfx_beep.wav", "Beep sound"),
  new RPGSoundEffect("sfx_boop", "Boop", "audio/sfx_boop.wav", "Boop sound"),
  new RPGSoundEffect("sfx_buzz", "Buzz", "audio/sfx_buzz.wav", "Buzz sound"),
  new RPGSoundEffect("sfx_ring", "Ring", "audio/sfx_ring.wav", "Ring sound"),
  new RPGSoundEffect("sfx_alarm2", "Alarm2", "audio/sfx_alarm2.wav", "Alarm sound 2"),
  new RPGSoundEffect("sfx_siren", "Siren", "audio/sfx_siren.wav", "Siren sound"),
  new RPGSoundEffect("sfx_ambient1", "Ambient1", "audio/sfx_ambient1.wav", "Ambient sound 1"),
  new RPGSoundEffect("sfx_ambient2", "Ambient2", "audio/sfx_ambient2.wav", "Ambient sound 2"),
  new RPGSoundEffect("sfx_ambient3", "Ambient3", "audio/sfx_ambient3.wav", "Ambient sound 3"),
  new RPGMusic("music_theme", "Theme Music", "audio/music_theme.mp3", "Main theme music"),
  new RPGMusic("music_battle", "Battle Music", "audio/music_battle.mp3", "Battle music"),
  new RPGMusic("music_victory", "Victory Music", "audio/music_victory.mp3", "Victory music"),
  new RPGMusic("music_defeat", "Defeat Music", "audio/music_defeat.mp3", "Defeat music"),
  new RPGMusic("music_town", "Town Music", "audio/music_town.mp3", "Town music"),
  new RPGMusic("music_castle", "Castle Music", "audio/music_castle.mp3", "Castle music"),
  new RPGMusic("music_dungeon", "Dungeon Music", "audio/music_dungeon.mp3", "Dungeon music"),
  new RPGMusic("music_field", "Field Music", "audio/music_field.mp3", "Field music"),
  new RPGMusic("music_forest", "Forest Music", "audio/music_forest.mp3", "Forest music"),
  new RPGMusic("music_cave", "Cave Music", "audio/music_cave.mp3", "Cave music"),
  new RPGMusic("music_shop", "Shop Music", "audio/music_shop.mp3", "Shop music"),
  new RPGMusic("music_quest", "Quest Music", "audio/music_quest.mp3", "Quest music"),
  new RPGMusic("music_ending", "Ending Music", "audio/music_ending.mp3", "Ending music"),
  new RPGAmbientSound("ambient_rain", "Rain Ambient", "audio/ambient_rain.wav", "Rain ambient sound"),
  new RPGAmbientSound("ambient_wind", "Wind Ambient", "audio/ambient_wind.wav", "Wind ambient sound"),
  new RPGAmbientSound("ambient_night", "Night Ambient", "audio/ambient_night.wav", "Night ambient sound"),
  new RPGAmbientSound("ambient_day", "Day Ambient", "audio/ambient_day.wav", "Day ambient sound"),
  new RPGAmbientSound("ambient_forest", "Forest Ambient", "audio/ambient_forest.wav", "Forest ambient sound"),
  new RPGAmbientSound("ambient_cave", "Cave Ambient", "audio/ambient_cave.wav", "Cave ambient sound"),
  new RPGAmbientSound("ambient_town", "Town Ambient", "audio/ambient_town.wav", "Town ambient sound"),
  new RPGAmbientSound("ambient_castle", "Castle Ambient", "audio/ambient_castle.wav", "Castle ambient sound"),
  new RPGAmbientSound("ambient_dungeon", "Dungeon Ambient", "audio/ambient_dungeon.wav", "Dungeon ambient sound"),
  new RPGVoiceSound("voice_hero", "Hero Voice", "audio/voice_hero.wav", "Hero voice sound"),
  new RPGVoiceSound("voice_villain", "Villain Voice", "audio/voice_villain.wav", "Villain voice sound"),
  new RPGVoiceSound("voice_npc", "NPC Voice", "audio/voice_npc.wav", "NPC voice sound"),
  new RPGVoiceSound("voice_party", "Party Voice", "audio/voice_party.wav", "Party voice sound"),
  new RPGVoiceSound("voice_boss", "Boss Voice", "audio/voice_boss.wav", "Boss voice sound"),
  // ...add more up to 200+ as needed
];
