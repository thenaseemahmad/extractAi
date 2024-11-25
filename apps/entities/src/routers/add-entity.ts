import { RequestValidationError, WorkspaceExistError } from "@chrome-buildin-ai-naseem/errors";
import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import EntityModel from "../models/entities";
const router = express.Router();



router.post('/entities',
    [body("entityName").notEmpty().withMessage("entityName field is missing"),body("workspaceId").notEmpty().withMessage("workspaceId field is missing")],
    async(req:Request,res:Response,next:NextFunction)=>{
        //validate request here
        const validationError = validationResult(req);
        try{
            if(!validationError.isEmpty()){
                throw new RequestValidationError(validationError.array());
            }
        }catch(error){
            next(error);
            return;
        }

        //check if entity exist
        const {workspaceId, entityName} = req.body;
        const existingEntity = await EntityModel.findOne({workspaceId:workspaceId, entityName:entityName});
        try{
            if(existingEntity){
                throw new WorkspaceExistError("Entity already exist");
            }
        }catch(error){
            next(error);
            return;
        }

        //add an entity
        const newEntity = new EntityModel({workspaceId:workspaceId, entityName:entityName, createdBy:'IAM', createdOn:Date.now()})
        newEntity.save();
        res.status(201).send(newEntity);
    });

    export {router as addEntity};;
