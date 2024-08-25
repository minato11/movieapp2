export type Movie = {
  title: string;
  id: number;
  poster_path: string;
};

export interface SearchResultProps {
  searchResults: Movie[];
  loading: boolean;
  error: null;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export interface Genres {
  id: number;
  name: string;
}



export interface MovieDetailsTypes {
  params: {
    id: number;
  };
  id: number;
  title: string;
  overview: string;
  genres: { id: number; name: string }[];
  origin_country: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  movieDetails: [];
  backdrop_path: string;
  vote_average: number;
  imageUrl: string;
  backdropUrl: string;
  movieId: number;
}

export interface GenreListTypes {
  name: string;
  params: {
    id: number;
  };
  poster_path: string;
  id: number;
  title: string;
  overview: string;
  genres: { id: number; name: string }[]
  movieData: Movie[];
  totalPages: number;
  currentPage: number;
  genreId: number;
  selectedGenre: number;
  genre: string;
  movie: string;
}

export interface HomePageTypes {
  searchParams: {
    query: string;
    page: number;
  };
}

export interface FilmListingProps {
  movies: Movie[];
}
