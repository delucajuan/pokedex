import { ValidationError } from 'express-validator';

export type HttpError = Error & {
  status?: number;
  msg?: string;
  cause?: ValidationError[];
  errorData?: unknown;
};

export type GetAllPokemonProps = {
  page: number;
  limit: number;
  name?: string;
  type?: string;
};

export type PokeApiParams = {
  offset: number;
  limit: number;
  name?: string;
  type?: string;
};

export type PokemonUrlList = {
  name: string;
  url: string;
}[];

export type Pokemon = {
  name: string;
  image: string;
  types: string[];
  order: number;
  stats: {
    name: string;
    base: number;
  }[];
};

export type PokemonDetail = Pokemon & {
  height: number;
  weight: number;
  abilities: {
    name: string;
    description: string;
  }[];
};

/* PokeApi responses */

export type PokeApiPaginated = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type PokeApiPokemonList = PokeApiPaginated & {
  results: {
    name: string;
    url: string;
  }[];
};

export type PokeApiPokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Resource[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: Resource;
  sprites: Sprites;
  stats: Stat[];
  types: PokemonType[];
  past_types: PastType[];
  cries: Cries;
  abilitiesDetails: PokeApiAbility[];
};

export type Ability = {
  is_hidden: boolean;
  slot: number;
  ability: Resource;
};

export type Resource = {
  name: string;
  url: string;
};

export type GameIndex = {
  game_index: number;
  version: Resource;
};

export type HeldItem = {
  item: Resource;
  version_details: VersionDetail[];
};

export type VersionDetail = {
  rarity: number;
  version: Resource;
};

export type Move = {
  move: Resource;
  version_group_details: VersionGroupDetail[];
};

export type VersionGroupDetail = {
  level_learned_at: number;
  version_group: Resource;
  move_learn_method: Resource;
};

export type Sprites = {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  other: OtherSprites;
  versions: Versions;
};

export type OtherSprites = {
  dream_world: Sprite;
  home: HomeSprites;
  'official-artwork': Sprite;
  showdown: Sprite;
};

export type Sprite = {
  front_default: string;
  front_female: string;
};

export type HomeSprites = {
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
};

export type Versions = {
  'generation-i': GenerationSprites;
  'generation-ii': GenerationSprites;
  'generation-iii': GenerationSprites;
  'generation-iv': GenerationSprites;
  'generation-v': GenerationSprites;
  'generation-vi': GenerationSprites;
  'generation-vii': GenerationSprites;
  'generation-viii': GenerationSprites;
};

export type GenerationSprites = {
  [key: string]: Sprite | VersionSprites;
};

export type VersionSprites = {
  animated?: Sprite;
  [key: string]: string | null | Sprite | undefined;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: Resource;
};

export type PokemonType = {
  slot: number;
  type: Resource;
};

export type PastType = {
  generation: Resource;
  types: PokemonType[];
};

export type Cries = {
  latest: string;
  legacy: string;
};

export type TypeEffectiveness = {
  name: string;
  url: string;
};

export type DamageRelations = {
  no_damage_to: TypeEffectiveness[];
  half_damage_to: TypeEffectiveness[];
  double_damage_to: TypeEffectiveness[];
  no_damage_from: TypeEffectiveness[];
  half_damage_from: TypeEffectiveness[];
  double_damage_from: TypeEffectiveness[];
};

export type PastDamageRelation = {
  generation: {
    name: string;
    url: string;
  };
  damage_relations: DamageRelations;
};

export type MoveDamageClass = {
  name: string;
  url: string;
};

export type Language = {
  name: string;
  url: string;
};

export type Name = {
  name: string;
  language: Language;
};

export type PokemonSlot = {
  slot: number;
  pokemon: {
    name: string;
    url: string;
  };
};

export type PokeApiTypes = {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  past_damage_relations: PastDamageRelation[];
  game_indices: GameIndex[];
  generation: {
    name: string;
    url: string;
  };
  move_damage_class: MoveDamageClass;
  names: Name[];
  pokemon: PokemonSlot[];
  moves: Move[];
};

export type PokemonList = {
  name: string;
  url?: string;
}[];

export type TypesList = {
  name: string;
  url: string;
}[];

export type getPokemonNamesProps = {
  searchValue: string;
  limit: number;
};

export type PokeApiAbility = {
  effect_changes: {
    effect_entries: {
      effect: string;
      language: {
        name: string;
        url: string;
      };
    }[];
    version_group: {
      name: string;
      url: string;
    };
  }[];
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
    short_effect: string;
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version_group: {
      name: string;
      url: string;
    };
  }[];
  generation: {
    name: string;
    url: string;
  };
  id: number;
  is_main_series: boolean;
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon: {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[];
};

export type formatPokemonDetailsProps = PokeApiPokemon & {
  abilitiesDetails: PokeApiAbility[];
};
