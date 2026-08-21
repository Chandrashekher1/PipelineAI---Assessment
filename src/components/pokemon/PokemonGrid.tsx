import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import LoadingSkelton from "../LoadinSkelton";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "../../types/pokemon";

interface PokemonGridProps {
    pokemon: Pokemon[];
    onSelectPokemon: (poke: Pokemon) => void;
    loading: boolean;
    error: string | null;
    fetchPokemon: () => void;
}

export default function PokemonGrid({
    pokemon,
    onSelectPokemon,
    loading,
    error,
    fetchPokemon,
}: PokemonGridProps) {
    if (error) {
        return <ErrorState error={error} onR={fetchPokemon} />;
    }

    if (loading) {
        return <LoadingSkelton count={20} />;
    }

    if (!pokemon || pokemon.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="flex flex-wrap gap-4 mx-16">
            {pokemon.map((poke) => (
                <PokemonCard
                    key={poke.id}
                    poke={poke}
                    onClick={() => onSelectPokemon(poke)}
                />
            ))}
        </div>
    );
}