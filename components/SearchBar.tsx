'use client'

import React, {useEffect, useState} from 'react';
import {debounce} from "../utils/debounce";
import Pagination from "@mui/material/Pagination"
import {usePathname, useRouter, useSearchParams} from "next/navigation";

const SearchBar = ({onSearchResults,}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const pathname = usePathname();
    const router = useRouter();

    const searchMovies = async (query, page = 1) => {
        if (query.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&query=${query}&page=${page}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            onSearchResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    const debouncedSearch = debounce((query) => {
        searchMovies(query);
    }, 1000);
    const handleSearchInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };
    const handleSearchBlur = () => {
        if (searchQuery) {
            params.set('query', searchQuery);
            params.set('page', currentPage.toString());
        } else {
            params.delete('query');
            params.delete('page');
        }
        router.push(`${pathname}?${params.toString()}`);
    }

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        const query = searchParams.get('query') || '';
        searchMovies(query, page);
        const newUrl = `${pathname}?query=${query}&page=${page}`;
        router.push(newUrl);
    };
    useEffect(() => {
        const query = searchParams.get('query') || '';
        const page = parseInt(searchParams.get('page')  || '1', 10);
        setSearchQuery(query);
        setCurrentPage(page);
        if (query) {
            searchMovies(query, page);
        }
    }, [searchParams]);
    const shouldApplyPagination = totalPages > 1 && currentPage <= totalPages;
    return (
        <div className="flex flex-col ">
            <div className="flex justify-center my-4">
                <input
                    type="text"
                    onChange={handleSearchInputChange}
                    onBlur={handleSearchBlur}
                    placeholder="Search for a movie..."
                    className="border rounded-l px-4 py-2 w-2/3 dark:text-dark"
                    defaultValue={searchParams.get('query')?.toString()}
                />
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className='flex justify-center'>
                {shouldApplyPagination && (
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                )}
            </div>
        </div>
    );
};
export default SearchBar;
