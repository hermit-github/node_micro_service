import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router
    .route("/product")
    .post(async (req:Request,res:Response,next:NextFunction) => {
        console.log("Creating product");
        res.status(201).json({
            message: "Catalog created successfully",
        })
    })

export default router;