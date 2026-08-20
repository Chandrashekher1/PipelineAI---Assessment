import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemon, onSelectPokemon, loading, error }: { pokemon: any, loading: boolean, error: string | null }) {


    return (
        <div className="flex flex-wrap gap-4">
            {pokemon?.map((poke: any) => {
                return (<PokemonCard key={poke.id} poke={poke} onClick={() => onSelectPokemon(poke)} />)
            })}
        </div>
    )
}