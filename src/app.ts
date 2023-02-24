import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import { movieRoutes } from "./routers/movies.routes";

const app: Application = express();
app.use(express.json());

app.use("/movies", movieRoutes);

app.use(handleErrors);

export default app;
