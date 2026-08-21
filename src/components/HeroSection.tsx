import { useState, useEffect } from "react";

export default function HeroSection() {
    const phrases = [
        "Your Favorite Pokémon",
        "Legendary Pokémon",
        "Rare Shiny Pokémon",
        "Every Single Pokémon",
    ];

    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = phrases[phraseIndex];
        const typingSpeed = isDeleting ? 40 : 80;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                const nextText = currentFullText.slice(0, displayText.length + 1);
                setDisplayText(nextText);

                if (nextText === currentFullText) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                const nextText = currentFullText.slice(0, displayText.length - 1);
                setDisplayText(nextText);

                if (nextText === "") {
                    setIsDeleting(false);
                    setPhraseIndex((prev) => (prev + 1) % phrases.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, phraseIndex]);

    return (
        <div className="relative overflow-hidden py-12 px-6 md:py-20">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-secondary/10 blur-3xl rounded-full pointer-events-none -z-10" />

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
                <div className="space-y-5 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark tracking-tight leading-tight min-h-[95px] md:min-h-[135px]">
                        Discover & Collect <br />
                        {displayText.includes("Pokémon") ? (
                            <>
                                <span>{displayText.replace("Pokémon", "")}</span>
                                <span className="text-secondary">Pokémon</span>
                            </>
                        ) : (
                            <span>{displayText}</span>
                        )}
                        <span className="inline-block w-1 md:w-1.5 h-8 md:h-12 bg-secondary ml-1.5 animate-pulse align-middle" />
                    </h1>

                    <p className="text-slate-500 font-medium text-base md:text-lg max-w-lg leading-relaxed">
                        Welcome to <span className="font-semibold text-dark">PokeExpo</span> the most comprehensive interactive database. Explore base stats, abilities, move sets, and evolutions.
                    </p>
                </div>

                <div className="relative flex items-center justify-center">
                    <div className="absolute h-64 w-64 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-secondary/20 via-orange-100/50 to-amber-100/40 blur-2xl -z-10" />

                    <div className="relative">
                        <img
                            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
                            alt="Charizard"
                            className="h-[280px] w-[280px] md:h-[350px] md:w-[350px] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}