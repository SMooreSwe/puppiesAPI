import { ObjectId } from "mongodb";

export type Puppy = {
    _id?: ObjectId,
    breed: string,
    name: string,
    birthdate: string,
}