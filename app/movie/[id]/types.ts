interface MovieDetailsTypes {
    id: number;
    title: string;
    overview: string;
    genres: { id: number; name: string }[];
    origin_country: string;
    release_date: string;
    runtime: number;
    poster_path: string;
    backdrop_path: string;
    vote_average: number
    imageUrl: string;
    backdropUrl: string;
    movieId: number;
}

export default MovieDetailsTypes;