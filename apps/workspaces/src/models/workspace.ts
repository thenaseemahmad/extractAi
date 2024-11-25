import mongoose, { model } from "mongoose";
import {IWorkspace} from '@chrome-buildin-ai-naseem/interfaces'

// export interface IWorkspace{
//     createdOn?: Date;
//     createdBy?: string;
//     workspaceName: string;
// }

const workspaceSchema = new mongoose.Schema<IWorkspace>({
    createdOn: {type: String, default: new Date().toISOString()},
    createdBy: {type: String, default:'IAM'},
    workspaceName: {type:String}
});

const Workspace = model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;