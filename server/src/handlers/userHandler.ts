import { Collection } from "mongo";
import { getDb } from "../config/database.ts";
import { User } from "../types/user.ts";

export default class UserHandler {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("user");
  }

  async getUser(email: string) {
    return await this.collection.findOne({ email });
  }

  async addUser(user: User) {
    return await this.collection.insertOne(user);
  }
}
