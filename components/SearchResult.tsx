import React from 'react';
import Link from "next/link";
import Pagination from "@mui/material/Pagination"
import Image from "next/image";

const ResultsPage = ({searchResults, loading, error, totalPages, currentPage, onPageChange}) => {
    const handlePageChange = (event, page) => {
        onPageChange(page);
    };

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="flex  flex-wrap flex-row  dark:text-white">
                <div className=' w-full content-around'>
                    <div className="image-container flex flex-wrap justify-between m-6 p-3">
                        {searchResults.map((movie) => (
                            <div key={movie.id} className="font-extralight leading-6 text-gray-900 dark:text-white ">
                                <Link href={`/movie/${movie.id}`}>
                                    <div
                                        className='font-extralight leading-6 text-gray-900 p-4 dark:text-white relative max-w-xs overflow-hidden bg-cover bg-no-repeat'>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="max-w-xs transition duration-300 ease-in-out hover:scale-110 object-cover rounded-lg"
                                            width={200}
                                            height={300}
                                        />
                                        <div
                                            className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-75 text-white text-center text-xs rounded-lg">
                                            {movie.title}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center pb-4'>
                        {totalPages > 1 && currentPage <= totalPages && (
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
