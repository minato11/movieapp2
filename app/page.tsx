'use client'

import React, {Suspense, useState} from 'react';
import Header from "../components/Header";
import Paginations from "../components/Paginations";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";

const HomePage = ({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) => {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const [searchResults, setSearchResults] = useState([]);
    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    return (
        <div >
            <Header />
                <Suspense key={query + currentPage}>
                    <SearchBar onSearchResults={handleSearchResults}/>
                </Suspense>
            {searchResults.length === 0 ? <Paginations/> : <SearchResult searchResults={searchResults} />}
        </div>
    );
};

export default HomePage;