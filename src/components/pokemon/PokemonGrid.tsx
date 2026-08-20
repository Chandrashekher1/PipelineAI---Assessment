import EmptyState from "../EmptyState";
import ErrorState from "../ErrorState";
import LoadingSkelton from "../LoadinSkelton";
import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemon, onSelectPokemon, loading, error, fetchPokemon }: { pokemon: any, onSelectPokemon: (poke: any) => void, loading: boolean, error: string | null, fetchPokemon: () => void }) {

    if (error) {
        return <ErrorState error={error} onR={fetchPokemon} />
    }

    if (loading) {
        return <LoadingSkelton count={20} />
    }

    if (!pokemon || pokemon.length === 0) {
        return <EmptyState />
    }
    return (
        <div className="flex flex-wrap gap-4">
            {pokemon?.map((poke: any) => (
                <PokemonCard key={poke.id} poke={poke} onClick={() => onSelectPokemon(poke)} />
            ))}
        </div>
    )
}