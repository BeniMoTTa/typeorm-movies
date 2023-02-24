import { Request, Response, NextFunction } from "express";

import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { iMovieRepo } from "../interfaces/movies.interfaces";

export const ensureMoviesExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepository.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }
  return next();
};
