'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import FilmListing from '@/components/FilmListing';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NotFound from '@/components/NotFound';
import { Movie, Genres } from '@/types/types';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Search from '@/components/Search';
import Header from '@/components/Header';
import { getGenres } from '@/utils/api';

const Page = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [genres, setGenres] = useState<Genres[]>([]);
  const [isValidGenre, setIsValidGenre] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const message = 'Could not find the requested page.';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query');
  const genreId = searchParams.get('genreId');

  useEffect(() => {
    const fetchGenresAndValidate = async () => {
      try {
        const genreData = await getGenres();
        setGenres(genreData);

        if (
          genreId &&
          !genreData.some(
            (genre: { id: { toString: () => string } }) => genre.id.toString() === genreId,
          )
        ) {
          setIsValidGenre(false);
        } else {
          setIsValidGenre(true);
        }
      } catch (error) {
        console.log('Failed to fetch genres', error);
      }
    };

    fetchGenresAndValidate();
  }, [genreId]);

  const searchMovie = async (query: string | null, page = 1, genreId?: string | null) => {
    try {
      const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&query=${query}&page=${page}&with_genres=${genreId}`;
      const response = await axios.get(apiUrl);
      setMovies(response.data.results || []);
      setTotalPages(response.data.total_pages);
      console.log(apiUrl, response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovies = async (page: number, genreId?: string | null) => {
    try {
      let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&query=${query}&page=${page}`;
      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }
      const response = await axios.get(apiUrl);
      setMovies(response.data.results || []);
      setTotalPages(response.data.total_pages);
      console.log(apiUrl, response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isValidGenre) {
      return;
    }
    if (query) {
      searchMovie(query, page, genreId);
    } else if (genreId) {
      fetchMovies(page, genreId);
    } else {
      fetchMovies(page);
    }
  }, [query, page, genreId, isValidGenre]);

  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    }
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreChange = (newGenreId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('genreId', newGenreId);
    params.delete('page');
    if (query) {
      params.set('query', query);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!isValidGenre) {
    return <NotFound message="The specified genre could not be found." />;
  }

  if (!page) {
    return <NotFound message={message} />;
  }

  return (
    <div>
      <div className="dark:text-white">
        <Header genres={genres} handleGenreChange={handleGenreChange} />
        <div className="flex justify-center pb-4 w-full">
          <Search />
        </div>
        <div className="w-full content-around">
          <FilmListing movies={movies} />
          <div className="flex justify-center pb-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
