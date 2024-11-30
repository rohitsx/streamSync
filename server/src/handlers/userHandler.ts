import { Collection } from "mongo";
import { getDb } from "../config/database.ts";
import { DbUser, User } from "../types/user.ts";

export default class UserHandler {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("user");
  }

  async getUser(id: string) {
    return await this.collection.findOne<DbUser>({ id });
  }

  async addUser(user: User) {
    const addUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: null,
      picture: user.picture,
	  ytRefreshToken: null
    };
    const koki = await this.collection.insertOne(addUser);
    console.log("koki", koki);
    return await this.getUser(user.id);
  }

  async setUsername(email: string, username: string) {
    return await this.collection.updateOne(
      { email },
      { $set: { username: username } },
    );
  }
}
