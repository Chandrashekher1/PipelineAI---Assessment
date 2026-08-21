import { useState } from "react";
import { usePokemon } from "../../hooks/usePokemon";
import PokemonGrid from "../pokemon/PokemonGrid";
import SearchBar from "./SearchBar";
import TypeFilter from "./TypeFilter";
import PokemonDetailsModal from "../pokemon/PokemonDetailsModal";
import { Loader2 } from "lucide-react";

import { Pokemon } from "../../types/pokemon";

export default function Explore() {
    const { pokemon, loading, loadingMore, error, searchPokemonByName, loadMorePokemon, filterByType, fetchPokemon } = usePokemon();
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    return (
        <div className="flex flex-col justify-center items-center mx-16 mt-16">
            <div className="p-4 rounded-xl shadow-md mx-4 grid grid-2 w-full">
                <div className="">
                    <div>
                        <TypeFilter filterByType={filterByType} />
                    </div>
                    <div className="flex justify-between items-center text-center">
                        <p className="text-sm text-gray-500 font-semibold text-dark">Showing <span className="text-secondary">{loading ? 20 : pokemon.length}</span> Pokemon</p>
                        <SearchBar onSearch={searchPokemonByName} />
                        {/* <SortMenu /> */}
                    </div>
                </div>
            </div>
            <div className="p-4">
                {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
                <PokemonGrid pokemon={pokemon} onSelectPokemon={setSelectedPokemon} loading={loading} error={error} fetchPokemon={fetchPokemon} />
            </div>
            {!loading && !error && pokemon.length > 0 && (
                <div className="flex justify-center my-4">
                    <button
                        onClick={loadMorePokemon}
                        disabled={loadingMore}
                        className="flex items-center gap-2 text-secondary border border-secondary px-12 py-2 rounded-md cursor-pointer hover:bg-secondary hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loadingMore ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                <span>Loading...</span>
                            </>
                        ) : (
                            <span>Load More</span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}