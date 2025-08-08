import express from "express";
import helmet from "helmet";
import cors from "cors";
import {HandleErrorWithLogger, httpLogger} from "./utils";

// import routes
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";
import morgan from "morgan";

const app = express();

// regular middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(httpLogger);
app.use(helmet());

app.get("/health",(req,res,next) => {
    res.status(200).json({message:"Hello From Order Service!"})
})

// import routes
app.use("/orders",orderRouter);
app.use("/cart",cartRouter);

app.use(HandleErrorWithLogger);

export default app;