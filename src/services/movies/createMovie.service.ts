import {
  MovieResult,
  iMovieCreate,
  iMovieRepo,
} from "../../interfaces/movies.interfaces";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities/movie.entity";
import { returnMovie } from "../../schemas/movies.schemas";

export const createMovieService = async (
  movieData: iMovieCreate
): Promise<MovieResult> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);
  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);
  const newMovie = returnMovie.parse(movie);

  return newMovie;
};
