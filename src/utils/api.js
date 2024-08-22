import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

export const getGenres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=f77adf9e4103d3a683d71fa4c240152a`,
    );
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=f77adf9e4103d3a683d71fa4c240152a&with_genres=${genreId}&page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    throw error;
  }
};
