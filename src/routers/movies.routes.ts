import { Router } from "express";
import {
  createMovieController,
  deleteMovieController,
  listMoviesController,
  updateMovieController,
} from "../controllers/movies.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieNameExistsMiddleware } from "../middlewares/ensureMovieExistisInDataBase.middleware";
import { ensureMoviesExists } from "../middlewares/ensureMoviesExists.middleware";
import {
  movieCreateSchema,
  movieUpdateSchema,
} from "../schemas/movies.schemas";

export const movieRoutes = Router();

movieRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieCreateSchema),
  ensureMovieNameExistsMiddleware,
  createMovieController
);

movieRoutes.get("", listMoviesController);
movieRoutes.delete("/:id", ensureMoviesExists, deleteMovieController);
movieRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(movieUpdateSchema),
  ensureMovieNameExistsMiddleware,
  ensureMoviesExists,
  updateMovieController
);
