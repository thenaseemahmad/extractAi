import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import { addEntity } from './routers/add-entity';
import { errorHandler } from '@chrome-buildin-ai-naseem/middlewares';
import { updateentity } from './routers/update-entity';
import { deleteEntity } from './routers/delete-entity';
import mongoose from 'mongoose';
import cors from 'cors';
import { findEntities } from './routers/get-entities';
import { NotFoundError } from '@chrome-buildin-ai-naseem/errors';
import { mongodbEndPoint } from '@chrome-buildin-ai-naseem/endpoints';

const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ? Number(process.env.PORT) : 3002;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('common'));

app.use(findEntities);
app.use(addEntity);
app.use(updateentity);
app.use(deleteEntity);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const serviceName = 'ENTITIES SERVICE';
async function start() {

  await mongoose.connect(`${mongodbEndPoint}/entities?directConnection=true`)
    .then(()=>{
      console.log(`${serviceName} Connected to MONGODB successfully`)
    })
    .catch((error)=>{
      console.log(`Unable to make MONGODB connection
        ERROR: ${error}`)
    })

  app.listen(port, host, () => {
    console.log(`[ ${serviceName} ready ] http://${host}:${port}`);
  });
}

start();
