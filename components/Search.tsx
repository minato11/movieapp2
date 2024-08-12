'use client'

import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import {useSearchParams } from "next/navigation";
import ResultsPage from "./SearchResult";
import axios from "axios";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const searchParams = useSearchParams();

    const searchMovie = async (query, page = 1) => {
        if (query.trim() === '') return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&query=${query}&page=${page}`);
            setSearchResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1);
        searchMovie(query, 1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        searchMovie(searchQuery, page);
    };

    useEffect(() => {
        const query = searchParams.get('query') || '';
        const page = parseInt(searchParams.get('page') || '1', 10);
        setSearchQuery(query);
        setCurrentPage(page);
        if (query) {
            searchMovie(query, page);
        }
    }, [searchParams]);

    return (
        <div>
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
            <ResultsPage
                searchResults={searchResults}
                loading={loading}
                error={error}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default SearchPage;
