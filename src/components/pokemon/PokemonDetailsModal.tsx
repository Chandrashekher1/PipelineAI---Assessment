import { ArrowLeft, X, Heart } from "lucide-react";
import { useState } from "react";
import { typeStyles, typeHeroBackground } from "../../utils/typeStyles";
import { Pokemon } from "../../types/pokemon";

interface PokemonDetailsModalProps {
    pokemon: Pokemon;
    onClose: () => void;
}

type TabType = "Overview" | "Abilities" | "Base Stats" | "Moves";

export default function PokemonDetailsModal({ pokemon, onClose }: PokemonDetailsModalProps) {
    const [activeTab, setActiveTab] = useState<TabType>("Overview");
    const [isFavorite, setIsFavorite] = useState(false);

    if (!pokemon) return null;

    const artwork = pokemon?.sprites?.other?.["official-artwork"]?.front_default ?? pokemon?.sprites?.front_default ?? "";
    const stats = pokemon?.stats ?? [];
    const tabs: TabType[] = ["Overview", "Abilities", "Base Stats", "Moves"];
    const primaryType = pokemon?.types?.[0]?.type?.name ?? "normal";
    const heroBackground = typeHeroBackground[primaryType] ?? "bg-slate-50";
    const totalStats = stats.reduce((acc, stat) => acc + stat.base_stat, 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm md:p-6" onClick={onClose}>
            <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="absolute left-5 right-5 top-5 z-20 flex items-center justify-between">
                    <button type="button" onClick={onClose} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-all hover:border-primary/30 hover:bg-primary hover:text-white">
                        <ArrowLeft size={18} />
                    </button>

                    <div className="flex items-center gap-2">
                        <button type="button" onClick={() => setIsFavorite(!isFavorite)} className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border bg-white/90 shadow-sm backdrop-blur transition-all ${isFavorite ? "border-secondary bg-secondary text-white" : "border-slate-200 text-slate-500 hover:border-secondary/30 hover:text-secondary"}`}>
                            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                        </button>

                        <button type="button" onClick={onClose} className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm backdrop-blur transition-all hover:bg-slate-100">
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <div className={`relative overflow-hidden px-6 pb-7 pt-10 md:px-10 ${heroBackground}`}>
                    <div className="absolute -right-10  h-64 w-64 rounded-full bg-white/60 blur-3xl" />

                    <div className="relative grid items-center gap-6 md:grid-cols-2">
                        <div className="order-2 md:order-1">
                            <p className="text-sm font-semibold tracking-wide text-slate-400">
                                #{String(pokemon.id).padStart(3, "0")}
                            </p>

                            <h1 className="mt-1 text-4xl font-extrabold capitalize tracking-tight text-dark md:text-5xl">
                                {pokemon.name}
                            </h1>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {pokemon.types?.map((item: any) => {
                                    const type = item?.type?.name;

                                    return (
                                        <span key={item.slot} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold capitalize ${typeStyles[type] ?? "bg-slate-100 text-slate-600"}`}>
                                            {type}
                                        </span>
                                    );
                                })}
                            </div>
                            <div className="mt-6 flex flex-wrap gap-3">
                                <div className="flex min-w-[100px] items-center gap-3 rounded-xl border border-white/70 bg-white/70 px-3 py-2.5">
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Height</p>
                                        <p className="text-sm font-bold text-dark">{pokemon.height / 10} m</p>
                                    </div>
                                </div>

                                <div className="flex min-w-[100px] items-center gap-3 rounded-xl border border-white/70 bg-white/70 px-3 py-2.5">
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">Weight</p>
                                        <p className="text-sm font-bold text-dark">{pokemon.weight / 10} kg</p>
                                    </div>
                                </div>

                                <div className="flex min-w-[100px] items-center gap-3 rounded-xl border border-white/70 bg-white/70 px-3 py-2.5">
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">EXP</p>
                                        <p className="text-sm font-bold text-dark">{pokemon.base_experience ?? "N/A"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 flex h-[250px] items-center justify-center md:order-2 md:h-[300px]">
                            <div className="absolute h-48 w-48 rounded-full bg-white/70 blur-2xl md:h-60 md:w-60" />
                            <img src={artwork} alt={pokemon.name} className="relative z-10 h-[240px] w-[240px] object-contain drop-shadow-2xl transition-transform duration-300  md:h-[300px] md:w-[300px]" />
                        </div>
                    </div>
                </div>

                <div className="shrink-0 overflow-x-auto border-b border-slate-100 bg-white px-6 md:px-10">
                    <div className="flex min-w-max gap-6">
                        {tabs.map((tab) => (
                            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative cursor-pointer py-4 text-sm font-semibold transition-colors ${activeTab === tab ? "text-primary" : "text-slate-400 hover:text-slate-600"}`}>
                                {tab}
                                {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-y-auto p-5 md:p-7">
                    {activeTab === "Overview" && (
                        <div className="grid gap-4 md:grid-cols-3">

                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark">Abilities</h3>
                                    <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">{pokemon.abilities?.length ?? 0}</span>
                                </div>

                                <div className="mt-4 space-y-2">
                                    {pokemon.abilities?.map((ability: any) => (
                                        <div key={ability.ability.name} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
                                            <span className="text-sm capitalize text-slate-600">{ability.ability.name}</span>
                                            {ability.is_hidden && <span className="rounded-full bg-secondary/10 px-2 py-1 text-[9px] font-bold text-secondary">Hidden</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark">Base Stats</h3>
                                    <span className="text-xs font-bold text-slate-400">{totalStats}</span>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {stats.map((stat: any) => {
                                        const value = stat.base_stat;

                                        return (
                                            <div key={stat.stat.name}>
                                                <div className="mb-1 flex justify-between text-[11px]">
                                                    <span className="capitalize text-slate-400">{stat.stat.name}</span>
                                                    <span className="font-bold text-dark">{value}</span>
                                                </div>

                                                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                                    <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${Math.min(value, 100)}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-dark">Moves</h3>
                                    <span className="rounded-full bg-secondary/10 px-2 py-1 text-[10px] font-bold text-secondary">{pokemon.moves?.length ?? 0}</span>
                                </div>

                                <div className="mt-4 space-y-2">
                                    {pokemon.moves?.slice(0, 6).map((move: any) => (
                                        <div key={move.move.name} className="rounded-lg bg-slate-50 px-3 py-2 text-sm capitalize text-slate-600">
                                            {move.move.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Abilities" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-dark">Abilities</h3>
                                </div>

                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{pokemon.abilities?.length ?? 0} Abilities</span>
                            </div>

                            <div className="mt-5 grid gap-3 md:grid-cols-2">
                                {pokemon.abilities?.map((ability: any) => (
                                    <div key={ability.ability.name} className={`flex items-center justify-between rounded-xl border p-4 ${ability.is_hidden ? "border-secondary/20 bg-secondary/5" : "border-slate-100 bg-slate-50"}`}>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm font-semibold capitalize text-dark">{ability.ability.name}</span>
                                        </div>

                                        {ability.is_hidden && <span className="rounded-full bg-secondary/10 px-2.5 py-1 text-[10px] font-bold text-secondary">Hidden</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Base Stats" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-dark">Base Statistics</h3>
                                    <p className="mt-1 text-xs text-slate-400">Detailed base statistics of {pokemon.name}.</p>
                                </div>

                                <div className="rounded-xl bg-primary/5 px-4 py-2 text-center">
                                    <p className="text-[10px] uppercase tracking-wide text-slate-400">Total</p>
                                    <p className="text-lg font-bold text-primary">{totalStats}</p>
                                </div>
                            </div>

                            <div className="mt-7 space-y-5">
                                {stats.map((stat: any) => {
                                    const value = stat.base_stat;
                                    const percentage = Math.min((value / 150) * 100, 100);

                                    return (
                                        <div key={stat.stat.name}>
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-medium capitalize text-slate-500">{stat.stat.name}</span>
                                                <span className="text-sm font-bold text-dark">{value}</span>
                                            </div>

                                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                                                <div className="h-full rounded-full bg-accent transition-all duration-700" style={{ width: `${percentage}%` }} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {activeTab === "Moves" && (
                        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-dark">Moves</h3>
                                    <p className="mt-1 text-xs text-slate-400">Available moves for {pokemon.name}.</p>
                                </div>

                                <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">{pokemon.moves?.length ?? 0} Moves</span>
                            </div>

                            <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                {pokemon.moves?.map((move: any) => (
                                    <div key={move.move.name} className="cursor-default rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm capitalize text-slate-600 transition-all hover:border-primary/20 hover:bg-primary/5 hover:text-primary">
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