import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/requestValidator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {

  const isValidUser = true;

  if(!isValidUser){
    res.status(StatusCodes.UNAUTHORIZED).json({error:"unauthorized"})
  }

  next()
}


router.use(authMiddleware);

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const {customerId} = req.query;
      const response = await service.GetCart(String(customerId), repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      next(err);
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

router
  .route("/:lineItemId")
  .patch(async (req, res, next) => {
    try {
      const lineItemId = req.params.lineItemId;
      const response = await service.EditCart({
        id:lineItemId,
        quantity:req.body.quantity,
      }, repo);
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
      const lineItemId = req.params.lineItemId;
      const response = await service.DeleteCart(lineItemId, repo);
      res.status(StatusCodes.OK).json(response);
    } catch (error) {
      const err = error as Error;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    }
  });

export default router;
