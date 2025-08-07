import express from "express";
import StatusCodes from "http-status-codes";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/requestValidator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const response = await service.GetCart({}, repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  })
  .post(async (req, res, next) => {
    try {
      const error = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
      }

      const response = await service.CreateCart(req.body as CartRequestInput, repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  })
  .patch(async (req, res, next) => {
    try {
      const response = await service.EditCart({}, repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  })
  .delete(async (req, res, next) => {
    try {
      const response = await service.DeleteCart({}, repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  });

export default router;
