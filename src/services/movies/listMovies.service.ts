import { AppDataSource } from "../../data-source";
import { Movie } from "../../entities";
import {
  iMovieRepo,
  IPagination,
  MovieAllReturn,
} from "../../interfaces/movies.interfaces";
import { returnAllMovies } from "../../schemas/movies.schemas";

export const listMoviesService = async (payload: any): Promise<IPagination> => {
  const moviesRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const countMovies: number = await moviesRepository.count();

  let page: number = Number(payload.page) > 0 ? Number(payload.page) : 1;
  const perPage: number =
    Number(payload.perPage) > 0 && Number(payload.perPage) <= 5
      ? Number(payload.perPage)
      : 5 || 5;

  const sort: any = payload.sort;
  const order: any = payload.order;

  let prevPage: string | null =
    page === 1
      ? null
      : `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`;

  let nextPage: string | null =
    countMovies <= perPage * page
      ? null
      : `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`;

  let findMovies: MovieAllReturn;

  if (!sort) {
    findMovies = await moviesRepository.find({
      take: perPage,
      skip: perPage * (page - 1),
      order: {
        id: "ASC",
      },
    });
  }
  if (sort && !order) {
    if (sort == "duration") {
      findMovies = await moviesRepository.find({
        take: perPage,
        skip: perPage * (page - 1),
        order: {
          duration: order,
        },
      });
    } else if (sort == "price") {
      findMovies = await moviesRepository.find({
        take: perPage,
        skip: perPage * (page - 1),
        order: {
          price: order,
        },
      });
    }
  }
  findMovies = await moviesRepository.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      id: "ASC" || "DESC",
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
