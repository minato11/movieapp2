'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import FilmListing from '@/components/FilmListing';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import NotFound from '@/components/NotFound';
import { Movie } from '@/types/types';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Search from '@/components/Search';
import { SearchResultProps } from '../../../movies-app/types/types';

const Page: React.FC<SearchResultProps> = () => {


  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState();

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const message = 'Could not find the requested page.';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const query = searchParams.get('query');

  const searchMovie = async (query: string | null, page = 1, genreId?: number) => {
    try {
      let apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&query=${query}&page=${page}`;
      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }
      const response = await axios.get(apiUrl);
      setMovies(response.data.results || []);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      let errorMessage = 'Failed to load data';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  const fetchMovies = async (page: number) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=f77adf9e4103d3a683d71fa4c240152a&page=${page}`
      );
      setMovies(response.data.results || []);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      searchMovie(query, page);
    } else {
      fetchMovies(page);
    }

  }, [query, page]);


  const handlePageChange = (_event: ChangeEvent<unknown>, newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!page) {
    return <NotFound message={message} />;
  }

  return (
    <div>
      <div className="dark:text-white">
        <Search/>
        <div className="w-full content-around">
          <FilmListing movies={movies}  />
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
