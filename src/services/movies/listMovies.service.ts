import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import { iMovieRepo, IPagination } from "../../interfaces/movies.interfaces";
import { returnAllMovies } from "../../schemas/movies.schemas";

export const listMoviesService = async (payload: any): Promise<IPagination> => {
  const moviesRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const countMovies: number = await moviesRepository.count();

  let page: number = Number(payload.page) > 0 ? payload.page : 1;
  const perPage: number =
    Number(payload.perPage) === undefined ? 5 : payload.perPage;

  let prevPage: string | null =
    page === 0
      ? null
      : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;

  let nextPage: string | null =
    countMovies <= perPage * page
      ? null
      : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;

  const findMovies: Array<Movie> = await moviesRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      durati: "ASC",
    },
  });
  const movies = returnAllMovies.parse(findMovies);

  const pagination: IPagination = {
    prevPage: prevPage,
    nextPage: nextPage,
    count: countMovies,
    data: movies,
  };

  return pagination;
};
