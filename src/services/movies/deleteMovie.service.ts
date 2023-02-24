import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMovieRepo } from "../../interfaces/movies.interfaces";

export const deleteMovieService = async (idMovie: number): Promise<void> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });
  await movieRepository.remove(movie!);
};
