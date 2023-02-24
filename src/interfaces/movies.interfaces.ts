import { returnMovie, returnAllMovies } from "../schemas/movies.schemas";
import { z } from "zod";

import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";
import { movieCreateSchema } from "../schemas/movies.schemas";

interface iPaginationBase {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
}

interface IPagination extends iPaginationBase {
  data: MovieAllReturn;
}

type iMovieCreate = z.infer<typeof movieCreateSchema>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;
type MovieResult = z.infer<typeof returnMovie>;
type MovieAllReturn = z.infer<typeof returnAllMovies>;

export {
  iMovieCreate,
  iMovieUpdate,
  iMovieRepo,
  MovieAllReturn,
  MovieResult,
  IPagination,
};
