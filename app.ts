import express from 'express';
import { Request, Response, Application } from 'express';

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

app.get('/api/test', (_req: Request, res: Response) => {
  return res.status(200).json({ test: 'is working as it should' });
});

export default app;
