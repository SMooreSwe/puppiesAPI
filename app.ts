import { createOne, deleteOne, getAll, getOne, updateOne } from './src/db';
import express, { NextFunction } from 'express';
import { Request, Response, Application } from 'express';
import { ObjectId } from 'mongodb';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app: Application = express();

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,          
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const puppyChecker = (req: Request, res: Response, next: NextFunction) => {
  const birthCheck = /^[\d]{4}-[\d]{2}-[\d]{2}$/;

  if (!req.body.breed || !req.body.name || !req.body.birthdate) {
  return res.status(400).json({err: 'puppy details missing'})
 } else if (typeof req.body.name !== 'string' || req.body.breed !== 'string' || req.body.birthdate !== 'string') {
  return res.status(400).json({err: 'please ensure puppy data is correct'})
} else if (!birthCheck.test(req.body.birthdate)) {
  return res.status(400).json({err: 'please ensure puppy birthdate is correct'})
}
  return next()
}

const idChecker = (req: Request, res: Response, next: NextFunction) => {
  const hexCheck = /^[\da-fA-F]{24}$/
  if (!req.params.id || !hexCheck.test(req.params.id)) {
    return res.status(400).json({err: 'please use vaid puppy id'})
  }
  return next()
}

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

app.get('/api/puppies', async (_req: Request, res: Response) => {
  const puppyList = await getAll();
  return res.json(puppyList);
}); 

app.get('/api/puppies/:id', idChecker, async (req: Request, res: Response) => {
  const puppyId = new ObjectId(req.params.id)
  const puppy = await getOne(puppyId);
  return res.json(puppy);
}); 

app.post('/api/puppies', jsonParser, puppyChecker, async (req: Request, res: Response) => {
  const newPuppy = await createOne(req.body.breed, req.body.name, req.body.birthdate)
  return res.json(newPuppy)
}); 

app.put('/api/puppies/:id', jsonParser, puppyChecker, idChecker, async (req: Request, res: Response) => {
  const puppyId = new ObjectId(req.params.id)
  const changedPuppy = await updateOne(puppyId, req.body.breed, req.body.name, req.body.birthdate)
  if (changedPuppy === null) {
    return res.status(404).json({err: 'puppy not found'})
  }
  return res.json(changedPuppy)
}); 

app.delete('/api/puppies/:id', idChecker, async (req: Request, res: Response) =>{
  const puppyId = new ObjectId(req.params.id)
  await deleteOne(puppyId)
  return res.sendStatus(204)

});

export default app;
