import { useEffect, useState } from "react"
import { Pokemon } from "../types/pokemon"

export const useFavourite = () => {
    const [favorites, setFavorites] = useState<Pokemon[]>(() => {
        const storedFavourites = localStorage.getItem("fav-pokemon")
        return storedFavourites ? JSON.parse(storedFavourites) : []
    })

    useEffect(() => {
        localStorage.setItem("fav-pokemon", JSON.stringify(favorites));
    }, [favorites])

    const addToFavorite = (pokemon: Pokemon) => {
        setFavorites((prev) => [...prev, pokemon])
    }

    const removeFavorite = (pokemonId: number) => {
        setFavorites((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId))
    }

    const toggleFavorite = (pokemon: Pokemon) => {
        if (favorites.some((p) => p.id === pokemon.id)) {
            removeFavorite(pokemon.id)
        } else {
            addToFavorite(pokemon)
        }
    }

    const isFavourite = (pokemonId: number) => {
        return favorites.some((pokemon) => pokemon.id === pokemonId)
    }

    return {
        favorites,
        toggleFavorite,
        isFavourite
    };
}

