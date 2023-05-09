import * as mongoDB from 'mongodb';
//import { ObjectId } from 'mongodb';

require('dotenv').config();

let db : mongoDB.Db;
let col: mongoDB.Collection;

const init = async () => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hackdayidea.bdc1jdl.mongodb.net/`,
      );
    try {
        await client.connect();
        db = await client.db(`${process.env.MONGO_DB}`);
        col = db.collection(`${process.env.MONGO_COLLECTION}`);
        console.log('Connected successfully to server');
    } catch (err) {
        console.error(err);
    }
};

export const getAll = async () => {
    const data = await col.find({}).toArray()
    return data;
}

init();