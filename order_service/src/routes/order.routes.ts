import express from "express";
import { StatusCodes } from "http-status-codes";
import { MessageBroker } from "../utils/broker";
import { OrderEvent } from "../types";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "Get Order" });
  })
  .post(async (req, res, next) => {
    //! order create logic

    //! publish the message
    await MessageBroker.publish({
      topic: "OrderEvents",
      headers: { token: req.headers.authorization },
      event: OrderEvent.CREATE_ORDER,
      message: {
        orderId: 1,
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 },
        ],
      },
    });
    
    res.status(StatusCodes.OK).json({ message: "Get Order" });
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "Get Order" });
  })
  .delete(async (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "Get Order" });
  });

export default router;
