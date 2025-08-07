import { NextFunction, Request,Response } from "express";
import { AuthorizationError, NotFoundError, ValidationError } from "./errors";
import { logger } from "../logger";


export const HandleErrorWithLogger = (
    error: Error,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    let reportError = true;
    let status = 500;
    let data = error.message;

    // skip common / known errors
    [NotFoundError,ValidationError,AuthorizationError].forEach(
        (typeOfError) => {
            if(error instanceof typeOfError) {
                reportError = false;
                status = error.status;
                data = error.message;
            }
        }  
    )

    if(reportError){
        // error reporting tools implementation etc:Cloudwatch,Sentry etc
        logger.error(error);
    } else {
        logger.warn(error); // ignore common errors caused by user
    }

    return res.status(status).json(data);
}

export const HandleUncaughtException = async (error:Error) => {
    // error report / monitoring tools
    logger.error(error);
    // recover
    process.exit(1);
}