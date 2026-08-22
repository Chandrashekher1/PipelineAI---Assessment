import { Heart, Compass, Moon, X, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()

    const isActive = (path: string) => location.pathname === path

    const handleNavigate = (path: string) => {
        setIsMenuOpen(false)
        navigate(path)
    }

    return (
        <div className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
                    <img
                        src="https://i.pinimg.com/736x/a7/f6/6a/a7f66a169d36cf59eadb6b38ef86849e.jpg"
                        alt="PokeExpo logo"
                        className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover shadow-sm"
                    />
                    <h1 className="text-lg sm:text-xl font-bold tracking-tight text-dark">
                        Poke<span className="text-secondary">Expo</span>
                    </h1>
                </div>

                <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-100 bg-slate-50/70 p-1">
                    <button
                        type="button"
                        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${isActive('/') ? 'bg-white text-dark shadow-sm' : 'text-slate-500 transition-colors hover:text-dark cursor-pointer'}`}
                        onClick={() => navigate('/')}
                    >
                        <Compass size={16} className="text-secondary" />
                        <span>Explore</span>
                    </button>
                    <button
                        type="button"
                        className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${isActive('/favourite') ? 'bg-white text-dark shadow-sm' : 'text-slate-500 transition-colors hover:text-dark cursor-pointer'}`}
                        onClick={() => navigate('/favourite')}
                    >
                        <Heart size={16} />
                        <span>Favorites</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 hover:text-dark cursor-pointer"
                        title="Toggle theme"
                    >
                        <Moon size={16} className="sm:w-[17px] sm:h-[17px]" />
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-50 md:hidden cursor-pointer"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-slate-100 bg-white px-4 py-3 md:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
                    <div className="flex flex-col gap-1.5">
                        <button
                            type="button"
                            onClick={() => handleNavigate('/')}
                            className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold ${isActive('/') ? 'bg-white text-dark shadow-sm' : 'text-slate-500 transition-colors hover:text-dark cursor-pointer'}`}
                        >
                            <Compass size={17} />
                            <span>Explore</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleNavigate('/favourite')}
                            className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold ${isActive('/favourite') ? 'bg-white text-dark shadow-sm' : 'text-slate-500 transition-colors hover:text-dark cursor-pointer'}`}
                        >
                            <Heart size={17} />
                            <span>Favorites</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}