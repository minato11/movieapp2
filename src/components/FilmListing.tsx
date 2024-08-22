import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FilmListingProps } from '@/types/types';

const FilmListing: React.FC<FilmListingProps> = ({ movies }) => {
  return (
    <div>
      <div className="container1 grid gap-6 p-3">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative overflow-hidden bg-cover bg-no-repeat font-extralight leading-6 text-gray-900 dark:text-white"
          >
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="rounded-lg object-cover transition duration-300 ease-in-out hover:scale-110"
              />
            </Link>
            <div className="absolute bottom-0 left-0 w-full rounded-lg bg-black bg-opacity-75 p-2 text-center text-xs text-white">
              {movie.title}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default FilmListing;
