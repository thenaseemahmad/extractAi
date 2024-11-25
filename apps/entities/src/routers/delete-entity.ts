import express, { Request, Response } from 'express';
import EntityModel from '../models/entities';

const router = express.Router();

router.delete('/entities/:entityid',
    async(req:Request, res:Response)=>{
        const deletedEntity = await EntityModel.findByIdAndDelete(req.params.entityid);
        res.status(200).send({deletedEntity});
    }
)

export {router as deleteEntity}; 