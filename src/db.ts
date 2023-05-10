import * as mongoDB from 'mongodb';
import { ObjectId } from 'mongodb';
import { Puppy } from 'types';

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
    const data = await col.find<Puppy[]>({}).toArray()
    return data;
}

export const getOne = async (id: ObjectId) => {
 const data = await col.findOne<Puppy>({ _id: new ObjectId(id)})
 return data;
}

export const createOne = async (addBreed: string, addName: string, addBirthdate: string) => {
    const newPuppy : Puppy = {
        breed: addBreed,
        name: addName,
        birthdate: addBirthdate,
    }

    try {
        const insert = await col.insertOne(newPuppy)
        const data = {
            _id: insert.insertedId,
            ...newPuppy,
        }
        return data;
    } catch (error) {
        return error
    }  
}

export const updateOne = async (id: ObjectId, newBreed: string, newName: string, newBirthdate: string) => {
    const newPuppyDetails : Puppy = {
        breed: newBreed,
        name: newName,
        birthdate: newBirthdate,
    }

    const data = await col.findOneAndReplace({ _id: new ObjectId(id)}, 
    newPuppyDetails, 
    { returnDocument: 'after'});
    return data;
}

export const  deleteQuote = async (id: ObjectId) => {
    const data = await col.deleteOne({ _id: new ObjectId(id) });
    return data;
}

init();