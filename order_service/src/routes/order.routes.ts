import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    res.status(StatusCodes.OK).json({ message: "Get Order" });
  })
  .post(async (req, res, next) => {
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
