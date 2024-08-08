'use client'

import React, { useState } from 'react';
import { debounce } from "../utils/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SearchBar = ({ onSearch, initialQuery='' }) => {
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    const router = useRouter();

    const debouncedSearch = debounce((query) => {
        onSearch(query);
    }, 1000);

    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleSearchBlur = () => {
        if (searchQuery) {
            params.set('query', searchQuery);
        } else {
            params.delete('query');
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex justify-center my-4">
            <input
                type="text"
                onChange={handleSearchInputChange}
                onBlur={handleSearchBlur}
                placeholder="Search for a movie..."
                className="border rounded-l px-4 py-2 w-2/3 dark:text-dark"
                defaultValue={initialQuery}
            />
        </div>
    );
};

export default SearchBar;
