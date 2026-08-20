import { useEffect, useState } from "react"
import { getLoadMorePokemon, getPokemonByName, getPokemonList } from "../services/pokemonApi"

export const usePokemon = () => {
    const [pokemon, setPokemon] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    const fetchPokemon = async () => {
        try {
            setLoading(true)
            setError(null)
            const list = await getPokemonList()
            setNextUrl(list.next)
            const details = await Promise.all(
                list?.results?.map((pokemon: any) => (
                    getPokemonByName(pokemon?.name)
                ))
            )
            setPokemon(details)
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const searchPokemonByName = async (name: string) => {
        if (!name.trim()) {
            return
        }
        try {
            setLoading(true)
            setError(null)
            const result = await getPokemonByName(name.toLocaleLowerCase().trim())
            setPokemon([result])
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }

    const loadMorePokemon = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await getLoadMorePokemon(nextUrl)
            const details = await Promise.all(
                result?.results?.map((pokemon: any) => (
                    getPokemonByName(pokemon?.name)
                ))
            )
            setPokemon((prev) => [...prev, ...details])
            setNextUrl(result.next)
        }
        catch (err) {
            setError(err.message)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchPokemon()
    }, [])

    return {
        pokemon,
        loading,
        error,
        fetchPokemon,
        searchPokemonByName,
        loadMorePokemon
    }
}