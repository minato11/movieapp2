'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {getGenres, getMoviesByGenre} from "../../../utils/api";
import Header from "../../../components/Header";
import Link from "next/link";
import Pagination from "@mui/material/Pagination"
import GenreListTypes from "./types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import NotFound from "./not-found";

const GenrePage = ({params}: GenreListTypes) => {
    const {id: genreId} = params;
    const [movies, setMovies] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [genreExists, setGenreExists] = useState(true);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const page = searchParams.get('page') || 1;
        setCurrentPage(Number(page));

        const fetchGenreName = async () => {
            try {
                const genres = await getGenres();
                const selectedGenre = genres.find((genre) => genre.id === parseInt(genreId));
                if (selectedGenre) {
                    setGenreName(selectedGenre.name);
                    setGenreExists(true); // Genre exists
                } else {
                    setGenreExists(false); // Genre does not exist
                }
            } catch (error) {
                console.error('Error fetching genre name:', error);
            }
        };
        const fetchMovies = async () => {
            try {
                const movieData = await getMoviesByGenre(genreId, currentPage)
                setMovies(movieData.results)
                setTotalPages(movieData.total_pages)
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        if (genreId) {
            fetchGenreName();
            fetchMovies();
        }
    }, [genreId, currentPage, searchParams]);
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        router.push(`${pathname}?page=${value}`)
        window.scrollTo({top: 0, behavior: 'smooth'})
    };
    if (!genreExists) {
        return <NotFound/>;
    }


    return (
        <div>
            <div>
                <Header/>
            </div>
            <h1 className="text-2xl font-light mb-4 dark:text-gray-200">
                Movies in genre {genreName}:
            </h1>
            <div className="flex  flex-wrap flex-row  dark:text-white">
                <div className=' w-full content-around'>
                    <div className="image-container flex flex-wrap justify-between m-6 p-3">
                        {movies.map((movie) => (
                            <div key={movie.id}
                                 className="font-extralight leading-6 text-gray-900 p-4 dark:text-white relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                                <Link href={`/movie/${movie.id}`}>
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.title}
                                        width={200}
                                        height={300}
                                        className="max-w-xs transition duration-300 ease-in-out hover:scale-110 object-cover rounded-lg"
                                    />

                                    <div
                                        className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-75 text-white text-center text-xs rounded-lg">
                                        {movie.title}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center pb-4'>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenrePage;
