'use client'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import {useEffect, useState} from "react";
import Link from "next/link";


const MovieList = () => {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f77adf9e4103d3a683d71fa4c240152a&page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setMovies(data.results)
                setTotalPages(data.total_pages);
            } catch (error) {
                console.log(error)
            }
        };
        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div>
            <div className="flex  flex-wrap flex-row  dark:text-white">
                <div className=' w-full content-around'>
                    <div className="image-container flex flex-wrap justify-between m-6 p-3">
                        {movies.map((movie) => (
                            <div key={movie.id}
                                 className=' font-extralight leading-6 text-gray-900 p-4 dark:text-white relative max-w-xs overflow-hidden bg-cover bg-no-repeat'>
                                <Link href={`/movie/${movie.id}`}>
                                    <h5 className='text-sm font-light truncate max-w-[250px]'>{movie.title}</h5>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="movie_image"
                                        width={250}
                                        height={375}
                                        className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
                                    />
                                </Link>
                            </div>
                        ))
                        }
                    </div>
                    <div className='flex justify-center pb-1'>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => {
                                setCurrentPage(value);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList