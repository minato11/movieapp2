'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { MovieDetailsTypes } from '../../../../../movies-app/types/types';
import NotFound from "../../../../../movies-app/components/NotFound";
import Header from '@/components/Header';
import { getGenres } from '@/utils/api';
import { Genres } from '@/types/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MovieDetailsPage = ({ params }: MovieDetailsTypes) => {
    const message = 'Could not find the requested movie.';
    const { id: movieId } = params;
    const [movieDetails, setMovieDetails] = useState<MovieDetailsTypes | null>(null);
    const [genres, setGenres] = useState<Genres[]>([]);
    const [error, setError] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const query = searchParams.get('query');
    const genreId = searchParams.get('genreId');

    const fetchGenres = async () => {
        try {
            const genreData = await getGenres();
            setGenres(genreData);
        } catch (error) {
            console.log('Failed to fetch genres', error);
        }
    };

    useEffect(() => {
        if (genreId) {
            router.push(`/?genreId=${genreId}`);
            return;
        }

        const getMovieDetails = async () => {
            try {
                const res = await axios.get(
                  `https://api.themoviedb.org/3/movie/${movieId}?api_key=f77adf9e4103d3a683d71fa4c240152a`,
                );
                setMovieDetails(res.data);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        getMovieDetails();
        fetchGenres();
    }, [movieId, genreId]);

    const handleGenreChange = (newGenreId: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('genreId', newGenreId);
        params.delete('page');
        if (query) {
            params.set('query', query);
        }
        router.push(`${pathname}?${params.toString()}`);
    };

    if (error || !movieDetails) {
        return <NotFound message={message} />;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    const imageUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
    const backdropUrl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;

    return (
      <div>
          <div className="relative z-10 header ">
              <Header genres={genres} handleGenreChange={handleGenreChange} />
          </div>
          <div className="inset-0 z-0 background-img">
              <Image
                src={backdropUrl}
                alt="Backdrop"
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
                className="pointer-events-none sm:hidden"
              />
          </div>
          <div className="relative max-w-screen-xl mx-auto p-5 text-white lg:flex lg:items-center ">
              <div className="flex-shrink-0 mx-10">
                  <div className="relative flex bg-cover bg-no-repeat ">
                      <Image
                        src={imageUrl}
                        alt="movie_image"
                        width={500}
                        height={750}
                        priority
                        className="rounded-lg shadow-lg transition duration-150 ease-in-out hover:scale-110 sm:w-full sm:h-full"
                      />
                  </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-10 flex flex-col items-center text-black dark:text-blue-50">
                  {movieDetails.title && (
                    <h1 className="text-4xl  font-semibold">{movieDetails.title.toUpperCase()}</h1>
                  )}
                  <ul className="mt-4 text-lg">
                      <li className="mb-2">Overview: {movieDetails.overview}</li>
                      <li className="mb-2">
                          Genres: {movieDetails.genres.map((genre) => (
                        <Link key={genre.id} href={`/?genreId=${genre.id}`}>
                            <span className="cursor-pointer hover:underline">{genre.name} </span>
                        </Link>
                      ))}
                      </li>
                      <li className="mb-2">Origin country: {movieDetails.origin_country}</li>
                      <li className="mb-2">Release date: {movieDetails.release_date}</li>
                      <li className="mb-2">Duration: {movieDetails.runtime} minutes</li>
                      <li className="mb-2">Rating: {movieDetails.vote_average}</li>
                  </ul>
              </div>
          </div>
      </div>
    );
};

export default MovieDetailsPage;
