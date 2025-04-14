import express from "express";
import helmet from "helmet";
import morgan from "morgan";

// import routes
import catalogRouter from "./api/catalog.router";

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(helmet());


// import routes
app.use("/catalog",catalogRouter);

export default app;