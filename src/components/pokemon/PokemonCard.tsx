export default function PokemonCard({ poke ,onClick }: { poke: any, onClick: () => void }) {
    return (
        <div>
            <div className="border rounded-md p-4" onClick={onClick}>
                <p>{poke?.order}</p>

                <img src={poke?.sprites?.front_default} alt={poke?.name} />
                <p>{poke?.name}</p>
                <div>
                    {poke?.types?.map((type: any) => (
                        <span key={type?.slot} className="ml-2 capitalize">{type?.type?.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}