export default function Navbar() {
    return (
        <div className="flex justify-between px-4 py-2 border-b-4">
            <div>
                <h1 className="text-2xl font-bold cursor-pointer">PokeExpo</h1>
            </div>
            <div>
                <div className="flex space-x-8 font-semibold">
                    <button className="cursor-pointer">Explore</button>
                    <button className="cursor-pointer">Favourite</button>
                </div>
            </div>
            <div>
                <button>Dark</button>
            </div>


        </div>
    )
}