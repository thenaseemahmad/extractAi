import express, { Request, Response } from "express";
import Workspace from "../models/workspace";

const router = express.Router();
router.get('/workspaces/:workspaceId?',
    async (req: Request, res: Response) => {
        const {workspaceId} = req.params;
        if (workspaceId) {
            const workspace = await Workspace.findById(workspaceId);
            res.status(200).send(workspace);
            return;
            
        }
        const workspaces = await Workspace.find();
        res.status(200).send(workspaces);
        
    }
)

export { router as findWorkspaces };