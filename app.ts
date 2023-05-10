import { getAll, getOne } from './src/db';
import express from 'express';
import { Request, Response, Application } from 'express';
import { ObjectId } from 'mongodb';

//const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();

const app: Application = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,          
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', async (_req: Request, res: Response) => {
  const puppyList = await getAll();
  return res.json(puppyList);
}); 

app.get('/api/puppies/:id', async (req: Request, res: Response) => {
  const puppyId = new ObjectId(req.params.id)
  const puppy = await getOne(puppyId);
  return res.json(puppy);
}); 

export default app;
