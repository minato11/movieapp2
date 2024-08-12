'use client'
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import {useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";


const MovieList = () => {

    const [movies, setMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
         const fetchMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f77adf9e4103d3a683d71fa4c240152a&page=${currentPage}`);
                setMovies(response.data.results)
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.log(error)
            }
        };
        fetchMovies();
        window.scrollTo({top: 0, behavior: 'smooth'});
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
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt="movie_image"
                                        width={200}
                                        height={300}
                                        className="max-w-xs transition duration-300 ease-in-out hover:scale-110 object-cover rounded-lg"
                                    />
                                </Link>
                                <div
                                    className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-75 text-white text-center text-xs rounded-lg">
                                    {movie.title}
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    <div className='flex justify-center pb-4'>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={(event, value) => {
                                setCurrentPage(value);
                            }}
                            color="primary"

                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieList