import { Heart, Compass, Moon } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex  items-center justify-between px-6 py-3.5">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <img
                        src="https://i.pinimg.com/736x/a7/f6/6a/a7f66a169d36cf59eadb6b38ef86849e.jpg"
                        alt="PokeExpo logo"
                        className="h-9 w-9 rounded-full object-cover shadow-sm "
                    />
                    <h1 className="text-xl font-bold tracking-tight text-dark">
                        Poke<span className="text-secondary">Expo</span>
                    </h1>
                </div>
                <nav className="flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50/70 p-1">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-dark shadow-sm transition-all"
                    >
                        <Compass size={16} className="text-secondary" />
                        <span>Explore</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-dark cursor-pointer"
                    >
                        <Heart size={16} />
                        <span>Favorites</span>
                    </button>
                </nav>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-dark cursor-pointer"
                        title="Toggle theme"
                    >
                        <Moon size={17} />
                    </button>
                </div>
            </div>
        </header>
    );
}