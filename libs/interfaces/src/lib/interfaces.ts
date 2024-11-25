export interface IWorkspace{
  createdOn?: string;
  createdBy?: string;
  workspaceName: string;
};

export interface IEntities{
  workspaceId: string;
  createdOn?: Date;
  createdBy?: string;
  entityName: string;
};

export interface IPrompt{
  prompt: string;
};

export interface IFile{
  file?:File
}