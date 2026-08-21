export default function EmptyState() {
    return (
        <div className="flex flex-col items-center text-center justify-center mt-44">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JoQwUgRnqvEosgH-oQdUKzoKXk3JkxYtUrVzhJK08NuR7jEV3Sdg3yY&s=10"
                alt="not-found"
                className="rounded-full w-40 h-40"
            />
            <p className="text-xl font-bold mt-5">No Pokemon found</p>
            <p className="font-semibold text-gray-500 mt-2">Try searching with a different name <br /> or select a type.</p>
        </div>
    )
}