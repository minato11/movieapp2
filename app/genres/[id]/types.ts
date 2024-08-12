interface GenreListTypes {
    id: number;
    title: string;
    overview: string;
    genres: string[];
    movieData: [];
    totalPages: number;
    currentPage: number;
    genreId: number;
    selectedGenre: number;
}
export default GenreListTypes