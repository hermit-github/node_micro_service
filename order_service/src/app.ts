import express from "express";
import helmet from "helmet";
import cors from "cors";
import {HandleErrorWithLogger, httpLogger, logger} from "./utils";

// import routes
import orderRouter from "./routes/order.routes";
import cartRouter from "./routes/cart.routes";
import morgan from "morgan";
import { MessageBroker } from "./utils/broker";
import { Consumer, Producer } from "kafkajs";

export const ExpressApp = async () => {
    const app = express();
    
    // regular middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("tiny"));
    app.use(httpLogger);
    app.use(helmet());


    //! 1st -> connect to the producer / consumer
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on("producer.connect", () => {
        logger.info("Producer connected...")
    });
    
    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on("consumer.connect",() => {
        logger.info("Consumer connected...")
    })

    //! -> subscribe to topic/ publish messages
    await MessageBroker.subscribe((message) => {
        logger.info("Consumer : received message");
        console.info("Message : ",message);
    },"OrderEvents")



    app.get("/health",(req,res,next) => {
        res.status(200).json({message:"Hello From Order Service!"})
    })
    
    // import routes
    app.use("/orders",orderRouter);
    app.use("/cart",cartRouter);
    
    app.use(HandleErrorWithLogger);

    return app;
}