export default function PokemonDetailsModal({ pokemon }: { pokemon: any }) {
    if (!pokemon) return null;

    return (
        <div>
            <div>
                <div>
                    <p>{pokemon?.name}</p>
                    <p>{pokemon?.id}</p>
                </div>

                <div>
                    <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
                </div>
            </div>
        </div>
    )
}