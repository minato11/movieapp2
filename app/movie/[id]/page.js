'use client'

import React, {useEffect, useState} from 'react';
import Header from "../../../components/Header";

const MovieDetailsPage = ({params}) => {
    const {id: movieId} = params;
    const [movieDetails, setMovieDetails] = useState([])
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=f77adf9e4103d3a683d71fa4c240152a`)
                if (!res.ok) {
                    throw new Error(`Could not find movie with id ${movieId}`)
                }
                const data = await res.json();
                setMovieDetails(data);
            } catch (error) {
                console.log(error)
            }
        }
        getMovieDetails();
    }, [movieId]);

    if (!movieDetails) {
        return <p>Loading...</p>;
    }
    const genreNames = movieDetails.genres?.map(item => item.name).join(', ') || [];
    console.log(movieDetails);


    return (
        <div className="MovieDetails">
            <div>
                <Header/>
            </div>
            <div className='flex flex-nowrap justify-center text-center dark:text-gray-200'>
                <div className='flex flex-nowrap justify-left relative max-w-xs overflow-hidden bg-cover bg-no-repeat'>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt="movie_image"
                        width={500}
                        height={750}
                        className='max-w-xs transition duration-300 ease-in-out hover:scale-110'
                    />
                </div>
                <div className='flex flex-col  items-center dark:text-gray-200 text-left'>
                    {movieDetails.title && (
                        <h1 className='font-semibold text-4xl whitespace-nowrap'>
                            {movieDetails.title.toUpperCase()}
                        </h1>
                    )}

                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Overview: {movieDetails.overview}
                    </ul>
                    <ul className='text-2xl dark:text-blue-100 text-left'>
                        Genres: {genreNames}
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
                        <img src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`} alt="previews"/>
                    </ul>
                    <ul>
                        Rainting: {movieDetails.vote_average}
                    </ul>


                </div>

            </div>
        </div>
    );
};


export default MovieDetailsPage;