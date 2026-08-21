import { Pokemon, PokemonListResponse, PokemonTypeResponse } from "../types/pokemon";
import { pokemon_api, pokemon_type_api } from "../utils/constants";

export const getPokemonList = async (): Promise<PokemonListResponse> => {
    const response = await fetch(pokemon_api);
    if (!response.ok) {
        throw new Error(`Error in fetching Pokemon list: ${response.status}`);
    }
    const data: PokemonListResponse = await response.json();
    return data;
};

export const getPokemonById = async (id: number): Promise<Pokemon> => {
    const response = await fetch(`${pokemon_api}/${id}`);
    if (!response.ok) {
        throw new Error(`Error in fetching Pokemon by id: ${response.status}`);
    }
    const data: Pokemon = await response.json();
    return data;
};

export const getPokemonByName = async (name: string): Promise<Pokemon> => {
    const response = await fetch(`${pokemon_api}/${name}`);
    if (!response.ok) {
        throw new Error(`Error in fetching Pokemon by name: ${response.status}`);
    }
    const data: Pokemon = await response.json();
    return data;
};

export const getPokemonByType = async (type: string): Promise<PokemonTypeResponse> => {
    const response = await fetch(`${pokemon_type_api}/${type}`);
    if (!response.ok) {
        throw new Error(`Error in fetching Pokemon by type: ${response.status}`);
    }
    const data: PokemonTypeResponse = await response.json();
    return data;
};

export const getPokemonDetails = async (url: string): Promise<Pokemon> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon details: ${response.status}`);
    }
    const data: Pokemon = await response.json();
    return data;
};

export const getLoadMorePokemon = async (url: string): Promise<PokemonListResponse> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error in fetching more Pokemon: ${response.status}`);
    }
    const data: PokemonListResponse = await response.json();
    return data;
};