import express, { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repositories/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";

const router = express.Router();
export const catalogService = new CatalogService(new CatalogRepository());

router
  .route("/products")
  .post(async (req: Request, res: Response, next: NextFunction) => {

    try {
      const {errors,input} = await RequestValidator(CreateProductRequest, req.body);
  
      if(errors) {
        res.status(StatusCodes.BAD_REQUEST).json(errors);
      }
  
      const data = await catalogService.createProduct(input);
  
      res.status(StatusCodes.CREATED).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }

  })
  .get(async (req: Request, res: Response, next: NextFunction) => {
    const limit = Number(req.query["limit"]);
    const offset = Number(req.query["offset"]);
    try {
  
      const data = await catalogService.getProducts(limit,offset);

      if(!data) {
        throw new Error("unable to get products!")
      }
  
      res.status(StatusCodes.OK).json(data);
    } catch (error) {
      const err = error as Error;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
    }

  });
  
router
    .route("/products/:id")
    .patch(async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {id} = req.params;
        const {errors,input} = await RequestValidator(UpdateProductRequest, req.body);

        if(!id) {
          res.status(StatusCodes.BAD_REQUEST).json("Product id is required");
        }

        if(errors) {
          res.status(StatusCodes.BAD_REQUEST).json(errors);
        }
        const data = await catalogService.updateProduct({id,...input});
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
      }
    })
    .get(async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      try {
    
        const data = await catalogService.getProduct(id);
    
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
      }
  
    })
    .delete(async (req: Request, res: Response, next: NextFunction) => {
      const {id} = req.params;
      try {
    
        const data = await catalogService.deleteProduct(id);
    
        res.status(StatusCodes.OK).json(data);
      } catch (error) {
        const err = error as Error;
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message);
      }
  
    })

export default router;
