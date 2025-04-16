import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repositories/catalog.repository";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

router
  .route("/product")
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const data = await catalogService.createProduct(req.body);

    res.status(StatusCodes.CREATED).json(data);
  });

export default router;
