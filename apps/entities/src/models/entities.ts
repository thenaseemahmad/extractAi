import { IEntities } from "@chrome-buildin-ai-naseem/interfaces";
import mongoose, { model } from "mongoose";

const schema = new mongoose.Schema<IEntities>({
    workspaceId: {type: String},
    createdOn: {type:Date, default: Date.now()},
    createdBy: {type: String, default: 'IAM'},
    entityName:{type: String}}
)

const EntityModel = model<IEntities>('Entity', schema);

export default EntityModel;