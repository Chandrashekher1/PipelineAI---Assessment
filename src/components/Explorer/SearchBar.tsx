import { SearchIcon } from "lucide-react";
import { useState } from "react";


interface SearchBarProps {
    onSearch: (name: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState<string>("");

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(search)
        }
    }

    return (
        <div className="outline outline-gray-300 outline-offset-1 mt-2 rounded-md w-[250px] shadow">
            <div className="flex items-center gap-2 px-2 py-2">
                <SearchIcon className="cursor-pointer text-gray-500 " size={18} />
                <input type="text"
                    placeholder="Search pokemon by name..."
                    className="bg-transparent outline-none text-gray-800 font-semibold text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>

        </div>
    )
}