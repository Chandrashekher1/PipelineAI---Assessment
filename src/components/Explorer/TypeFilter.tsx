import {
    ListFilter,
    Grid2X2,
    Flame,
    Droplets,
    Leaf,
    Zap,
    CircleDot,
    Ghost,
    Moon,
    Snowflake,
    Shield,
    Sparkles,
    type LucideIcon,
} from "lucide-react";
import { useState } from "react";

interface TypeFilterProps {
    filterByType: (type: string) => void;
}

const types: string[] = [
    "All",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ghost",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
];

const typeIcons: Record<string, LucideIcon> = {
    All: Grid2X2,
    Fire: Flame,
    Water: Droplets,
    Grass: Leaf,
    Electric: Zap,
    Psychic: CircleDot,
    Ghost: Ghost,
    Ice: Snowflake,
    Dragon: Shield,
    Dark: Moon,
    Fairy: Sparkles,
};

const typeColors: Record<string, string> = {
    All: "text-gray-500",
    Fire: "text-pokemon-fire",
    Water: "text-pokemon-water",
    Grass: "text-pokemon-grass",
    Electric: "text-pokemon-electric",
    Psychic: "text-pokemon-psychic",
    Ghost: "text-pokemon-ghost",
    Ice: "text-pokemon-ice",
    Dragon: "text-pokemon-dragon",
    Dark: "text-pokemon-dark",
    Fairy: "text-pokemon-fairy",
};

export default function TypeFilter({ filterByType }: TypeFilterProps) {
    const [activeType, setActiveType] = useState("All");

    const handleFilter = (type: string) => {
        setActiveType(type);
        filterByType(type.toLowerCase());
    };

    return (
        <section className="space-y-3">
            <div className="flex items-center gap-2">
                <ListFilter size={17} className="text-slate-500" />
                <h2 className="text-sm font-semibold text-dark">Filter by Type</h2>
            </div>
            <div className="flex flex-wrap gap-2">
                {types.map((type) => {
                    const Icon = typeIcons[type];
                    const isActive = activeType === type;
                    return (
                        <button
                            key={type}
                            type="button"
                            onClick={() => handleFilter(type)}
                            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "border-secondary bg-secondary/20 shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary"}`}
                        >
                            <Icon size={16} strokeWidth={2.2} className={typeColors[type]} />
                            <span>{type}</span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}