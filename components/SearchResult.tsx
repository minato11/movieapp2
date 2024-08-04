import React from 'react';
import Link from "next/link";

const ResultsPage = ({searchResults}) => {
    return (
        <div className="flex flex-wrap flex-row dark:text-white">
            <div className="image-container flex flex-wrap m-8 items-center ">
                {searchResults.map((movie) => (
                    <div key={movie.id} className="font-extralight leading-6 text-gray-900 dark:text-white ">
                        <Link href={`/movie/${movie.id}`} className='justify-center text-center'>
                            <h5 className='text-sm font-light truncate max-w-[250px] '>{movie.title}</h5>
                            <div className='justify-items-center mt-2.5 p-2.5 relative max-w-xs overflow-hidden bg-cover bg-no-repeat'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                                    width={187.5}
                                    height={281.25}
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultsPage;