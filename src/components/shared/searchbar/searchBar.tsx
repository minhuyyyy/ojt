//components
import SearchInput from "@components/inputs/searchInput";
import Sort from "../filters/sort/sort";
import Wallet from "../wallet/wallet";
import Compare from "../filters/compare/compare";


function SearchBar() {
    return (
        <div className='w-screen h-14 border-gray-200 border-2 rounded-sm flex flex-row items-center justify-start bg-white'>
            <div className='w-4/5 flex flex-row lg:mx-auto justify-between'>
                <SearchInput />
                <Sort />
                <Wallet />
                <Compare />
            </div>
        </div>
    );
}

export default SearchBar;
