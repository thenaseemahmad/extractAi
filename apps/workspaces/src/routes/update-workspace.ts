import express, { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Workspace from '../models/workspace';
import { RequestValidationError, WorkspaceExistError } from '@chrome-buildin-ai-naseem/errors';
const router = express.Router();

router.patch('/workspaces/:workspaceid', [body('workspaceName').notEmpty().withMessage('Workspace name can not be empty')],
    async(req:Request, res:Response, next:NextFunction)=>{
        const workspaceid = req.params.workspaceid;
        //check if there is any validation errors with the request?
        const validationError = validationResult(req);
        try{
            if(!validationError.isEmpty()){
                throw new RequestValidationError(validationError.array());
            }
        }catch(error){
            next(error);
            return;
        };

        //check if a workspace with this id exist?
        const existingWorkspace = await Workspace.findById(workspaceid);
        try{
            if(!existingWorkspace){
                throw new WorkspaceExistError("No such workspace exist");
            }
        }catch(error){
            next(error);
            return;
        }

        //make change in the workspace after all validations
        const {workspaceName} = req.body;

        const updatedWorkspace = await Workspace.findByIdAndUpdate(workspaceid, {workspaceName:workspaceName},{new:true, upsert:true});
        res.status(200).send({updatedWorkspace});
    })

    export {router as updateWorkspaceRouter};