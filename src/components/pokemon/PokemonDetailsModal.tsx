import { ArrowLeft, X, Heart } from "lucide-react";
import { useState } from "react";
import { typeStyles, typeHeroBackground } from "../../utils/typeStyles";
import { Pokemon } from "../../types/pokemon";
import { useFavourite } from "../../hooks/useFavourite";

interface PokemonDetailsModalProps {
    pokemon: Pokemon;
    onClose: () => void;
}

type TabType = "Overview" | "Abilities" | "Base Stats" | "Moves";

export default function PokemonDetailsModal({ pokemon, onClose }: PokemonDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>("Overview");
    const { toggleFavorite, isFavourite } = useFavourite();

    if (!pokemon) return null;

    const isFav = isFavourite(pokemon.id);
    const artwork = pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? pokemon?.sprites?.front_default ?? "";
    const stats = pokemon?.stats ?? [];
    const tabs: TabType[] = ["Overview", "Abilities", "Base Stats", "Moves"];
    const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";
    const heroBackground = typeHeroBackground[primaryType] ?? "bg-slate-50";
    const totalStats = stats.reduce((acc, stat) => acc + stat.base_stat, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-2 sm:p-4 md:p-6 backdrop-blur-sm" onClick={onClose}>
            <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="absolute left-3 right-3 top-3 sm:left-5 sm:right-5 sm:top-5 z-20 flex items-center justify-between pointer-events-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-all hover:border-primary/30 hover:bg-primary hover:text-white"
                        title="Back"
                    >
                        <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                            type="button"
                            onClick={() => toggleFavorite(pokemon)}
                            className={`flex h-8 w-8 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border shadow-sm backdrop-blur transition-all ${
                                isFav
                                    ? "border-secondary bg-secondary/15 text-secondary"
                                    : "border-slate-200 bg-white/90 text-slate-500 hover:border-secondary/30 hover:text-secondary"
                            }`}
                            title="Favorite"
                        >
                            <Heart size={16} className="sm:w-[18px] sm:h-[18px]" fill={isFav ? "currentColor" : "none"} />
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex h-8 w-8 sm:h-10 sm:w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-all hover:bg-slate-100"
                            title="Close"
                        >
                            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
                        </button>
                    </div>
                </div>

                <div className={`relative shrink-0 overflow-hidden px-4 pb-4 pt-12 sm:px-6 sm:pb-6 sm:pt-14 md:px-10 ${heroBackground}`}>
                    <div className="absolute -right-10 h-64 w-64 rounded-full bg-white/60 blur-3xl pointer-events-none" />

                    <div className="relative grid items-center gap-3 md:grid-cols-2 md:gap-6">
                        <div className="order-2 md:order-1 text-center md:text-left">
                            <p className="text-xs sm:text-sm font-semibold tracking-wide text-slate-400">
                                #{String(pokemon.id).padStart(3, "0")}
                            </p>

                            <h1 className="mt-0.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold capitalize tracking-tight text-dark">
                                {pokemon.name}
                            </h1>

                            <div className="mt-2.5 flex flex-wrap justify-center md:justify-start gap-1.5 sm:gap-2">
                                {pokemon.types?.map((item) => {
                                    const type = item?.type?.name;

                                    return (
                                        <span
                                            key={item.slot}
                                            className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold capitalize ${typeStyles[type] ?? "bg-slate-100 text-slate-600"
                                                }`}
                                        >
                                            {type}
                                        </span>
                                    );
                                })}
                            </div>

                            <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-2 max-w-sm mx-auto md:mx-0 sm:flex sm:flex-wrap sm:gap-3">
                                <div className="rounded-xl border border-white/70 bg-white/70 px-2.5 py-1.5 sm:px-3 sm:py-2 text-center md:text-left">
                                    <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-slate-400">Height</p>
                                    <p className="text-xs sm:text-sm font-bold text-dark">{pokemon.height / 10} m</p>
                                </div>

                                <div className="rounded-xl border border-white/70 bg-white/70 px-2.5 py-1.5 sm:px-3 sm:py-2 text-center md:text-left">
                                    <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-slate-400">Weight</p>
                                    <p className="text-xs sm:text-sm font-bold text-dark">{pokemon.weight / 10} kg</p>
                                </div>

                                <div className="rounded-xl border border-white/70 bg-white/70 px-2.5 py-1.5 sm:px-3 sm:py-2 text-center md:text-left">
                                    <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wide text-slate-400">EXP</p>
                                    <p className="text-xs sm:text-sm font-bold text-dark">{pokemon.base_experience ?? "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 flex h-[130px] sm:h-[180px] md:h-[240px] items-center justify-center md:order-2">
                            <div className="absolute h-32 w-32 sm:h-44 sm:w-44 md:h-56 md:w-56 rounded-full bg-white/70 blur-2xl pointer-events-none" />
                            <img
                                src={artwork}
                                alt={pokemon.name}
                                className="relative z-10 h-[120px] w-[120px] sm:h-[170px] sm:w-[170px] md:h-[230px] md:w-[230px] object-contain drop-shadow-2xl transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="shrink-0 overflow-x-auto border-b border-slate-100 bg-white px-4 sm:px-6 md:px-10 scrollbar-none">
                    <div className="flex min-w-max gap-4 sm:gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActiveTab(tab)}
                                className={`relative cursor-pointer py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold transition-colors ${activeTab === tab ? "text-primary font-bold" : "text-slate-400 hover:text-slate-600"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 md:p-7">
                    {activeTab === "Overview" && (
                        <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                            <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark text-sm sm:text-base">Abilities</h3>
                                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                                        {pokemon.abilities?.length ?? 0}
                                    </span>
                                </div>

                                <div className="mt-3 sm:mt-4 space-y-2">
                                    {pokemon.abilities?.map((ability) => (
                                        <div key={ability.ability.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-xs sm:text-sm">
                                            <span className="capitalize text-slate-600 font-medium">{ability.ability.name}</span>
                                            {ability.is_hidden && (
                                                <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] font-bold text-secondary">
                                                    Hidden
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark text-sm sm:text-base">Base Stats</h3>
                                    <span className="text-xs font-bold text-slate-400">{totalStats}</span>
                                </div>

                                <div className="mt-3 sm:mt-4 space-y-2.5">
                                    {stats.map((stat) => {
                                        const value = stat.base_stat;

                                        return (
                                            <div key={stat.stat.name}>
                                                <div className="mb-1 flex justify-between text-[10px] sm:text-[11px]">
                                                    <span className="capitalize text-slate-400 font-medium">{stat.stat.name}</span>
                                                    <span className="font-bold text-dark">{value}</span>
                                                </div>

                                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-accent transition-all duration-500"
                                                        style={{ width: `${Math.min(value, 100)}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark text-sm sm:text-base">Moves</h3>
                                    <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                                        {pokemon.moves?.length ?? 0}
                                    </span>
                                </div>

                                <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-1 sm:space-y-1">
                                    {pokemon.moves?.slice(0, 6).map((move) => (
                                        <div key={move.move.name} className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs capitalize text-slate-600 font-medium">
                                            {move.move.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Abilities" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base sm:text-lg font-bold text-dark">Abilities</h3>
                                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                                    {pokemon.abilities?.length ?? 0} Abilities
                                </span>
                            </div>

                            <div className="mt-4 sm:mt-5 grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                                {pokemon.abilities?.map((ability) => (
                                    <div
                                        key={ability.ability.name}
                                        className={`flex items-center justify-between rounded-xl border p-3.5 sm:p-4 ${ability.is_hidden ? "border-secondary/20 bg-secondary/5" : "border-slate-100 bg-slate-50"
                                            }`}
                                    >
                                        <span className="text-xs sm:text-sm font-semibold capitalize text-dark">{ability.ability.name}</span>
                                        {ability.is_hidden && (
                                            <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                                                Hidden
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Base Stats" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-dark">Base Statistics</h3>
                                    <p className="mt-0.5 text-xs text-slate-400">Detailed base statistics of {pokemon.name}.</p>
                                </div>

                                <div className="rounded-xl bg-primary/5 px-3 py-1.5 sm:px-4 sm:py-2 text-center">
                                    <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-slate-400">Total</p>
                                    <p className="text-base sm:text-lg font-bold text-primary">{totalStats}</p>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 space-y-3.5 sm:space-y-4">
                                {stats.map((stat) => {
                                    const value = stat.base_stat;
                                    const percentage = Math.min((value / 150) * 100, 100);

                                    return (
                                        <div key={stat.stat.name}>
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="text-xs sm:text-sm font-medium capitalize text-slate-500">{stat.stat.name}</span>
                                                <span className="text-xs sm:text-sm font-bold text-dark">{value}</span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div
                                                    className="h-full rounded-full bg-accent transition-all duration-700"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === "Moves" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-4 sm:p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold text-dark">Moves</h3>
                                    <p className="mt-0.5 text-xs text-slate-400">Available moves for {pokemon.name}.</p>
                                </div>

                                <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
                                    {pokemon.moves?.length ?? 0} Moves
                                </span>
                            </div>

                            <div className="mt-4 sm:mt-6 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                                {pokemon.moves?.map((move) => (
                                    <div
                                        key={move.move.name}
                                        className="cursor-default rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs sm:text-sm capitalize text-slate-600 transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary font-medium text-center sm:text-left"
                                    >
                                        {move.move.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}