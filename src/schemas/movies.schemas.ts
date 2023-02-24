import { z } from "zod";

export const movieCreateSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional().nullable(),
  duration: z.number().positive(),
  price: z.number().int(),
});
export const returnMovie = movieCreateSchema.extend({
  id: z.number(),
});
export const returnAllMovies = returnMovie.array();
export const movieUpdateSchema = movieCreateSchema.partial();
