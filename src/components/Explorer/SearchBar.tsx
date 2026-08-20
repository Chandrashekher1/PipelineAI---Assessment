import { SearchIcon } from "lucide-react";
import {useState } from "react";


export default function SearchBar({ onSearch }: { onSearch: (name: string) => void }) {
    const [search, setSearch] = useState("")

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(search)
        }
    }

    return (
        <div>
            <div className="flex items-center gap-2 rounded-full border-2 border-gray-300 px-4">
                <SearchIcon className="cursor-pointer text-gray-500" size={24} />
                <input type="text"
                    placeholder="Search"
                    className="bg-transparent outline-none text-gray-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
        </div>
    )
}