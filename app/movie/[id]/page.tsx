'use client'

import React, {useEffect, useState} from 'react';
import Header from "../../../components/Header";
import NotFound from "./not-found";
import axios from "axios";
import Image from 'next/image'
import MovieDetailsTypes from "./types";
import Link from "next/link";


const MovieDetailsPage = ({params}) => {
    const {id: movieId} = params;
    const [movieDetails, setMovieDetails] = useState<MovieDetailsTypes | null>(null)
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f77adf9e4103d3a683d71fa4c240152a`)
                setMovieDetails(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getMovieDetails()
    }, [movieId]);

    if (!movieDetails) {
        return <p>Loading...</p>;
    }
    const imageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;


    if (!movieDetails || !movieDetails.title) {
        return <NotFound/>
    }


    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className='flex flex-wrap flex-row max-w-100% text-center dark:text-gray-200 p-5 lg:flex-nowrap'>
                <div className='flex relative overflow-hidden bg-cover bg-no-repeat'>
                    <Image
                        src={imageUrl}
                        alt="movie_image"
                        width={500}
                        height={750}
                        className=' transition duration-300 ease-in-out hover:scale-110'
                    />
                </div>
                <div className='flex flex-col  items-center dark:text-gray-200 '>
                    {movieDetails.title && (
                        <h1 className='font-semibold text-4xl whitespace-nowrap'>
                            {movieDetails.title.toUpperCase()}
                        </h1>
                    )}

                    <ul className='text-2xl dark:text-blue-100 text-center'>
                        Overview: {movieDetails.overview}
                    </ul>
                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Genres: {movieDetails.genres.map((genre) => (
                        <Link key={genre.id} href={`/genres/${genre.id}`}>
                            <span className="cursor-pointer hover:underline">{genre.name} </span>
                        </Link>
                    ))}
                    </ul>
                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Origin country: {movieDetails.origin_country}
                    </ul>
                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Release date: {movieDetails.release_date}
                    </ul>
                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Duration: {movieDetails.runtime} minutes
                    </ul>
                    <ul>
                        <Image
                            src={backdropUrl}
                            width={500}
                            height={750}
                            alt="previews"/>
                    </ul>
                    <ul>
                        Rating: {movieDetails.vote_average}
                    </ul>


                </div>

            </div>
        </div>
    );
};

export default MovieDetailsPage