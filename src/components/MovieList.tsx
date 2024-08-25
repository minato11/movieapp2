'use client';

import React, { useEffect, useState } from 'react';
import { Movie } from '../../../movies-app/types/types';
import NotFound from '../../../movies-app/components/NotFound';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import FilmListing from '@/components/FilmListing';

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const searchParams = useSearchParams();
  const message = 'Could not find the requested page.';
  const page = parseInt(searchParams.get('page') || '1', 10);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=f77adf9e4103d3a683d71fa4c240152a&page=${currentPage}`,
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);
  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };
  if (!page) {
    return <NotFound message={message} />;
  }
  return (
    <div>
      <div className="dark:text-white">
        <div className="w-full content-around">
         <FilmListing movies={movies}/>
          <div className="flex justify-center pb-4">
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

export default MovieList;
