export default function TypeFilter({ filterByType }: { filterByType: (type: string) => void }) {
    const types = [
        "all",
        "fire",
        "water",
        "grass",
        "electric",
        "psychic",
        "ghost",
        "ice",
        "dragon",
        "dark",
        "fairy",
    ]

    return (
        <div className="">
            <div className="flex justify-between">
                <div>
                    {types.map((type) => (
                        <span key={type}
                            className="mx-4 cursor-pointer hover:text-blue-500 transition-colors"
                            onClick={() => filterByType(type)}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}