import { InvalidObjectId, RequestValidationError } from "@chrome-buildin-ai-naseem/errors";
import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import EntityModel from "../models/entities";

const router = express.Router();

router.patch('/entities/:entityid',
    [body('entityName').notEmpty().withMessage('Invalid entity supplied')],
    async (req: Request, res: Response, next: NextFunction) => {
        //validate the request parameter
        const validationError = validationResult(req);
        try{
            if(!validationError.isEmpty()){
                throw new RequestValidationError(validationError.array());
            }
        }catch(error){
            next(error);
            return;
        }

        //check whether this entity exist
        const entityId = req.params.entityid;
        const thisEntity = EntityModel.findById(entityId);
        try{
            if(!thisEntity){
                throw new InvalidObjectId("No such entity id found");
            }
        }catch(error){
            next(error);
            return;
        }

        //lets update the entity now
        const {entityName} = req.body;
        const updatedEntity = await EntityModel.findByIdAndUpdate(entityId,{entityName:entityName},{new:true});
        res.status(200).send({updatedEntity});
    }
)

export {router as updateentity};