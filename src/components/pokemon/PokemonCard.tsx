import { Heart } from "lucide-react";
import { typeStyles, typeHeroBackground } from "../../utils/typeStyles";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
    poke: Pokemon;
    onClick: () => void;
    isFavourite: boolean;
    onToggleFavorite: () => void;
}

export default function PokemonCard({ poke, onClick, isFavourite, onToggleFavorite }: PokemonCardProps) {
    const primaryType = poke?.types?.[0]?.type?.name ?? "normal";
    const heroBg = typeHeroBackground[primaryType] ?? "bg-slate-50";

    const stats = [
        {
            name: "HP",
            base_stat: poke?.stats?.[0]?.base_stat ?? 0,
        },
        {
            name: "ATK",
            base_stat: poke?.stats?.[1]?.base_stat ?? 0,
        },
        {
            name: "DEF",
            base_stat: poke?.stats?.[2]?.base_stat ?? 0,
        },
        {
            name: "SPA",
            base_stat: poke?.stats?.[3]?.base_stat ?? 0,
        },
        {
            name: "SPD",
            base_stat: poke?.stats?.[4]?.base_stat ?? 0,
        },
        {
            name: "SPE",
            base_stat: poke?.stats?.[5]?.base_stat ?? 0,
        },
    ];

    return (
        <div
            onClick={onClick}
            className={`group w-full sm:w-[120px] md:w-[220px] cursor-pointer overflow-hidden rounded-2xl border border-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${heroBg}`}
        >
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                    #{String(poke?.id).padStart(3, "0")}
                </span>
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite();
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full transition cursor-pointer ${
                        isFavourite
                            ? "bg-secondary/15 text-secondary"
                            : "bg-white/80 text-slate-400 hover:text-secondary"
                    }`}
                >
                    <Heart
                        size={17}
                        fill={isFavourite ? "currentColor" : "none"}
                    />
                </button>
            </div>

            <div className="relative mt-2 flex h-[150px] items-center justify-center">
                <div className="absolute h-28 w-28 rounded-full bg-white/60 blur-2xl" />
                <img
                    src={poke?.sprites?.other?.["official-artwork"]?.front_default ?? poke?.sprites?.front_default ?? ""}
                    alt={poke?.name}
                    className="relative h-[145px] w-[145px] object-contain transition-transform duration-300 "
                />
            </div>

            <div className="mt-1">
                <p className="text-lg font-bold capitalize text-dark">
                    {poke?.name}
                </p>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
                {poke?.types?.map((type) => {
                    const typeName = type?.type?.name;
                    const badgeStyle = typeStyles[typeName] ?? "bg-slate-100 text-slate-600";
                    return (
                        <span
                            key={type?.slot}
                            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${badgeStyle}`}
                        >
                            {typeName}
                        </span>
                    );
                })}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
                {stats.map((stat) => (
                    <div key={stat.name} className="rounded-lg bg-white/60 px-1 py-1.5 text-center">
                        <p className="text-[9px] font-medium text-slate-400">{stat.name}</p>
                        <p className="text-xs font-bold text-dark">{stat.base_stat}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}