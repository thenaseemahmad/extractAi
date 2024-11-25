import { InvalidObjectId } from "@chrome-buildin-ai-naseem/errors";
import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Workspace from "../models/workspace";

const router = express.Router();

router.delete('/workspaces/:workspaceid',
    async (req: Request, res: Response, next: NextFunction) => {
        const workspaceId = req.params.workspaceid;
        //check for a valid object id
        try {
            if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
                throw new InvalidObjectId("Invalid workspace id supplied");
            }
        } catch (error) {
            next(error);
            return;
        }

        //check if workspace exist?
        const existingWorkspace = Workspace.findOne({ _id: workspaceId });
        if (!existingWorkspace) {
            return res.status(200).send({ message: "Workspace does not exist to delete" })
        }

        //Delete the workspace
        try {
            const deleteResult = await Workspace.findByIdAndDelete(workspaceId);
            return res.status(200).send({ message: "Workspace deleted successfully", deleteResult });
        } catch (error) {
            next(error);
            return;
        }

    }
)

export {router as deleteWorkspace};