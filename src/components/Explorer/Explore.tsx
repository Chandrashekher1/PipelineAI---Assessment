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
        <div className="flex flex-col justify-center items-center md:mx-16 mx-4 mt-16">
            <div className="p-4 rounded-xl shadow-md mx-4 grid-1 w-full">
                <div className="">
                    <div>
                        <TypeFilter filterByType={filterByType} />
                    </div>
                    <div className="flex md:justify-end items-center text-center">
                        <SearchBar onSearch={searchPokemonByName} />
                        {/* <SortMenu /> */}
                    </div>
                </div>
            </div>
            <div className="p-4 w-full">
                {selectedPokemon && <PokemonDetailsModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
                <p className="text-sm text-gray-500 font-semibold text-dark md:ml-16 my-4">Showing <span className="text-secondary">{loading ? 20 : pokemon.length}</span> Pokemon</p>
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