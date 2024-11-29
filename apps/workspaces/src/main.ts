import bodyParser from 'body-parser';
import express, { NextFunction } from 'express';
import morgan from 'morgan';
import { createNewWorkspaceRouter } from './routes/create-workspace';
import {errorHandler} from '@chrome-buildin-ai-naseem/middlewares';
import mongoose from 'mongoose';
import { updateWorkspaceRouter } from './routes/update-workspace';
import { deleteWorkspace } from './routes/delete-workspace';
import cors from 'cors';
import { NotFoundError} from '@chrome-buildin-ai-naseem/errors';
import { findWorkspaces } from './routes/find-workspaces';
import { mongodbEndPoint } from '@chrome-buildin-ai-naseem/endpoints';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));

app.use(findWorkspaces);
app.use(createNewWorkspaceRouter);
app.use(updateWorkspaceRouter);
app.use(deleteWorkspace);


app.all('*', (req, res, next:NextFunction) => {
  try{
    throw new NotFoundError();
  }catch(error){
    next(error);
    return;
  }
});

app.use(errorHandler);

const serviceName = 'WORKSPACE SERVICE'
async function start(){

  //make connection with mongodb here test
  await mongoose.connect(`${mongodbEndPoint}/workspaces?directConnection=true`)
    .then(() => {
      console.log(`${serviceName} Connected to MONGODB successfully`)
    })
    .catch((err) => {
      console.log(`Unable to make MONGODB connection
        ERROR: ${err}`)

    });

  app.listen(port, host, () => {
    console.log(`[ ${serviceName} ready ] http://${host}:${port}`);
  });
}

start();
