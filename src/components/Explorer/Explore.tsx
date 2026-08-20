import { useState } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import PokemonGrid from "../pokemon/PokemonGrid";
import SearchBar from "./SearchBar";
import SortMenu from "./SortMenu";
import TypeFilter from "./TypeFilter";
import PokemonDetailsModal from "../pokemon/PokemonDetailsModal"

export default function Explore() {
    const { pokemon, loading, error, searchPokemonByName, loadMorePokemon, filterByType, fetchPokemon } = usePokemon()
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    return (
        <div>
            <div className="p-4">
                <div>Explore Type</div>
                <div className="border-2"></div>
                <div className="flex justify-between">
                    <div>
                        <TypeFilter filterByType={filterByType} />
                    </div>

                    <div className="flex gap-6">
                        <SearchBar onSearch={searchPokemonByName} />
                        <SortMenu />
                    </div>
                </div>
                <div>
                    <h1>Pokemon</h1>
                </div>
                <div>
                    {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} />}
                    <PokemonGrid pokemon={pokemon} onSelectPokemon={setSelectedPokemon} loading={loading} error={error} fetchPokemon={fetchPokemon} />
                </div>
            </div>
            {!loading && !error && pokemon.length > 0 && (
                <div className="flex justify-center">
                    <button onClick={loadMorePokemon} className="bg-gray-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-gray-600 transition-colors">Load More</button>
                </div>
            )}
        </div>
    )
}