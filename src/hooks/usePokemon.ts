import { useEffect, useState } from "react";
import { getLoadMorePokemon, getPokemonByName, getPokemonByType, getPokemonList } from "../services/pokemonApi";
import { Pokemon } from "../types/pokemon";

export interface UsePokemonReturn {
    pokemon: Pokemon[];
    loading: boolean;
    loadingMore: boolean;
    error: string | null;
    fetchPokemon: () => Promise<void>;
    searchPokemonByName: (name: string) => Promise<void>;
    loadMorePokemon: () => Promise<void>;
    filterByType: (type: string) => Promise<void>;
}

export const usePokemon = (): UsePokemonReturn => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    const fetchPokemon = async (): Promise<void> => {
        try {
            setLoading(true);
            setError(null);
            const list = await getPokemonList();
            setNextUrl(list.next);
            const details: Pokemon[] = await Promise.all(
                list?.results?.map((item) => getPokemonByName(item.name))
            );
            setPokemon(details);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to fetch Pokémon");
        } finally {
            setLoading(false);
        }
    };

    const searchPokemonByName = async (name: string): Promise<void> => {
        if (!name.trim()) {
            await fetchPokemon();
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await getPokemonByName(name.toLowerCase().trim());
            setPokemon([result]);
        } catch {
            setPokemon([]);
            setError(null);
        } finally {
            setLoading(false);
        }
    };

    const loadMorePokemon = async (): Promise<void> => {
        if (!nextUrl || loadingMore) return;
        try {
            setLoadingMore(true);
            setError(null);
            const result = await getLoadMorePokemon(nextUrl);
            const details: Pokemon[] = await Promise.all(
                result?.results?.map((item) => getPokemonByName(item.name))
            );
            setPokemon((prev) => [...prev, ...details]);
            setNextUrl(result.next);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to load more Pokémon");
        } finally {
            setLoadingMore(false);
        }
    };

    const filterByType = async (type: string): Promise<void> => {
        const cleanType = type.toLowerCase().trim();
        if (cleanType === "all") {
            await fetchPokemon();
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const result = await getPokemonByType(cleanType);
            const details: Pokemon[] = await Promise.all(
                result?.pokemon?.slice(0, 20).map((item) => getPokemonByName(item.pokemon.name))
            );
            setPokemon(details);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Failed to filter by type");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    return {
        pokemon,
        loading,
        loadingMore,
        error,
        fetchPokemon,
        searchPokemonByName,
        loadMorePokemon,
        filterByType,
    };
};