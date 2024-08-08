'use client'

import React, { Suspense, useState, useEffect } from 'react';
import Header from "../components/Header";
import Paginations from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MovieList from "../components/MovieList";

const HomePage = ({ searchParams }) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const [searchQuery, setSearchQuery] = useState(query);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPageState, setCurrentPageState] = useState(currentPage);

    const searchParamsHook = useSearchParams();
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
            setSearchResults(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPageState(1);
        searchMovies(query, 1);
        updateUrl(query, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPageState(page);
        searchMovies(searchQuery, page);
        updateUrl(searchQuery, page);
    };

    const updateUrl = (query, page) => {
        const params = new URLSearchParams();
        if (query) params.set('query', query);
        if (page) params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        if (query) {
            searchMovies(query, currentPageState);
        }
    }, [searchParamsHook]);

    return (
        <div>
            <Header />
            <Suspense fallback={<p>Loading...</p>}>
                <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            </Suspense>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {searchResults.length > 0 ? (
                <SearchResult
                    searchResults={searchResults}
                    totalPages={totalPages}
                    currentPage={currentPageState}
                    onPageChange={handlePageChange}
                />
            ) : (
                <MovieList/>
            )}
        </div>
    );
};

export default HomePage;
