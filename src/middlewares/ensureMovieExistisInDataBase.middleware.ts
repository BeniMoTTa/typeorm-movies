import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { iMovieRepo } from "../interfaces/movies.interfaces";

export const ensureMovieNameExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepository: iMovieRepo = AppDataSource.getRepository(Movie);

  const movieExists = await movieRepository.findOne({
    where: {
      name: req.body.name,
    },
  });
  if (!Object.keys(req.body).includes("name")) {
    return next();
  }

  if (movieExists) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};
