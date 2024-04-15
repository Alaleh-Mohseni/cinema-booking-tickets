import { IoSearchOutline } from "react-icons/io5";

function SearchForm() {
    return (
        <div className="pt-2 relative mx-auto text-slate-500">
            <input
                className="bg-gray-800 w-96 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="جستجوی فیلم، سینما، بازیگر و ..."
            />
            <button type="submit" className="absolute right-0 -top-1 mt-5 mr-4">
                <IoSearchOutline size="22" />
            </button>
        </div>
    )
}

export default SearchForm