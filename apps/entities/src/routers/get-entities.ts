import express, { Request, Response } from "express";
import EntityModel from "../models/entities";

const router = express.Router();

router.get('/entities/:workspaceId?',
    async(req:Request, res:Response)=>{
        const {workspaceId} = req.params;
        if(workspaceId){
            const entities = await EntityModel.find(
                {workspaceId});
            res.status(200).send(entities);
            return;
        }
        //return all entities
        const entities = await EntityModel.find();
        res.status(200).send(entities);
    });

export { router as findEntities};