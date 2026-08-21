export interface PokemonAbility {
    ability: {
        name: string;
        url: string;
    };
    is_hidden: boolean;
    slot: number;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonTypeItem {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonMove {
    move: {
        name: string;
        url: string;
    };
}

export interface PokemonSprites {
    front_default: string | null;
    back_default?: string | null;
    other?: {
        "official-artwork"?: {
            front_default: string | null;
        };
        dream_world?: {
            front_default: string | null;
        };
    };
}

export interface Pokemon {
    id: number;
    name: string;
    order: number;
    height: number;
    weight: number;
    base_experience: number | null;
    sprites: PokemonSprites;
    types: PokemonTypeItem[];
    stats: PokemonStat[];
    abilities: PokemonAbility[];
    moves: PokemonMove[];
}

export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonListItem[];
}

export interface PokemonTypeResultItem {
    slot: number;
    pokemon: {
        name: string;
        url: string;
    };
}

export interface PokemonTypeResponse {
    id: number;
    name: string;
    pokemon: PokemonTypeResultItem[];
}
