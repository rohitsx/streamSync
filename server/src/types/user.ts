import { ObjectId } from "mongo";

export interface User {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface DbUser {
  _id?: ObjectId;
  name: string;
  email: string;
  picture: string;
}
