import { Search } from 'lucide-react';

export default function SearchBar() {
    return (
        <label className="flex items-center gap-2 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#64748B]">
            <Search className="h-4 w-4" />
            <input
                type="text"
                placeholder="Rechercher"
                className="w-36 bg-transparent outline-none sm:w-48"
            />
        </label>
    );
}
