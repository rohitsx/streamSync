import { Collection } from "mongo";
import { getDb } from "../config/database.ts";
import { DbUser, User } from "../types/user.ts";

export default class UserHandler {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("user");
  }

  async getUser(email: string) {
    return await this.collection.findOne<DbUser>({ email });
  }

  async addUser(user: User) {
    const addUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: null,
      picture: user.picture,
    };
    return await this.collection.insertOne(addUser);
  }
}
