import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import {
  iMovieRepo,
  iMovieUpdate,
  MovieResult,
} from "../../interfaces/movies.interfaces";
import { returnMovie } from "../../schemas/movies.schemas";

export const updateMovieService = async (
  movieData: iMovieUpdate,
  idMovie: number
): Promise<MovieResult> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);
  const oldMovieData = await movieRepository.findOneBy({
    id: idMovie,
  });
  const movie = movieRepository.create({
    ...oldMovieData,
    ...movieData,
  });
  await movieRepository.save(movie);
  const updateMovie = returnMovie.parse(movie);
  return updateMovie;
};
