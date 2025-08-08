import express from "express";
import helmet from "helmet";
import {HandleErrorWithLogger, httpLogger} from "./utils";

// import routes
import catalogRouter from "./api/catalog.router";
import morgan from "morgan";

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(httpLogger);
app.use(helmet());


// import routes
app.use("/catalog",catalogRouter);

app.use(HandleErrorWithLogger);

export default app;