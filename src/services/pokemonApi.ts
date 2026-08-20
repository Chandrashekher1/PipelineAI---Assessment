import { pokemon_api } from "../utils/constants"

export const getPokemonList = async () => {
    try {
        const response = await fetch(pokemon_api)
        if (!response.ok) {
            throw new Error(`Error in fetching Pokemon ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error("Error in fetching Pokemon", err)
    }
}

export const getPokemonById = async (id: number) => {
    try {
        const response = await fetch(`${pokemon_api}/${id}`)
        if (!response.ok) {
            throw new Error(`Error in fetching Pokemon ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error("Error in fetching Pokemon", err)
    }
}

export const getPokemonByName = async (name: string) => {
    try {
        const response = await fetch(`${pokemon_api}/${name}`)
        if (!response.ok) {
            throw new Error(`Error in fetching Pokemon ${response.status}`)
        }
        const data = await response.json()
        // console.log(data)
        return data
    }
    catch (err) {
        console.error("Error in fetching Pokemon", err)
    }
}

export const getPokemonByType = async (type: string) => {
    try {
        const response = await fetch(`${pokemon_api}/type/${type}`)
        if (!response.ok) {
            throw new Error(`Error in fetching Pokemon ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error("Error in fetching Pokemon", err)
    }
}
export const getPokemonDetails = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch Pokémon details");
    }

    return response.json();
};

export const getLoadMorePokemon = async (url: string) => {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Error in fetching Pokemon ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    catch (err) {
        console.error("Error in fetching Pokemon", err)
    }
}