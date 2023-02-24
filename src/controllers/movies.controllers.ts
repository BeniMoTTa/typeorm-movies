import { Request, Response } from "express";
import { iMovieCreate } from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/movies/createMovie.service";
import { deleteMovieService } from "../services/movies/deleteMovie.service";
import { listMoviesService } from "../services/movies/listMovies.service";
import { updateMovieService } from "../services/movies/updateMovie.service";

export const createMovieController = async (req: Request, res: Response) => {
  const movieData: iMovieCreate = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

export const listMoviesController = async (req: Request, res: Response) => {
  const movies = await listMoviesService(req.query);
  return res.json(movies);
};

export const deleteMovieController = async (req: Request, res: Response) => {
  await deleteMovieService(+req.params.id);
  return res.status(204).send();
};
export const updateMovieController = async (req: Request, res: Response) => {
  const movieData = req.body;
  const idMovie = +req.params.id;

  const updatedMovie = await updateMovieService(movieData, idMovie);
  return res.status(200).json(updatedMovie);
};
