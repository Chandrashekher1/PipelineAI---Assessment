import { useState } from "react"
import EmptyState from "../components/EmptyState"
import PokemonGrid from "../components/pokemon/PokemonGrid"
import { useFavourite } from "../hooks/useFavourite"
import { Pokemon } from "../types/pokemon"
import PokemonDetailsModal from "../components/pokemon/PokemonDetailsModal"

export default function Favourites() {
    const { favorites } = useFavourite()
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

    return (
        <div className="px-4 md:px-12 mt-12">
            <h1 className="text-xl sm:text-2xl font-bold text-center">My Favourite <span className="text-secondary">Pokémons</span></h1>
            {favorites.length === 0 ? (
                <EmptyState title={"No Favourite Pokemon"} description={"Add some pokemons to your favourites to see them here."}
                />
            ) : (
                <PokemonGrid pokemon={favorites} onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)} loading={false} error={null} fetchPokemon={() => { }} />
            )}
            {selectedPokemon && (
                <PokemonDetailsModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
            )}
        </div>
    )
}