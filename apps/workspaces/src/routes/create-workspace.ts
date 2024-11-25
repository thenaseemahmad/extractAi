import express, { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError, WorkspaceExistError} from "@chrome-buildin-ai-naseem/errors";
import Workspace from "../models/workspace";

const router = express.Router();
router.post('/workspaces', 
    [body("workspaceName").notEmpty().withMessage("Workspace name can not be empty")], 
    async(req: Request, res: Response, next: NextFunction)=>{
        const validationError = validationResult(req);
        try{
            if(!validationError.isEmpty()){
                throw new RequestValidationError(validationError.array());
            }
        }
        catch(error){
            next(error);
            return;
        }

        //check if this workspace exist?
        const {workspaceName, createdBy} = req.body;
        const existingWorkspace = await Workspace.findOne({workspaceName:workspaceName, createdBy:createdBy});
        try{
            if(existingWorkspace){
                throw new WorkspaceExistError("Workspace already exist");
            }
        }catch(error){
            next(error);
            return;
        }

        //now create a new workspace after all validations
        const newWorkspace = new Workspace({workspaceName, createdBy});
        await newWorkspace.save();
        res.status(201).send({newWorkspace});
})

export {router as createNewWorkspaceRouter};