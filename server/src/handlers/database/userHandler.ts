import { Collection } from "mongo";
import { getDb } from "../../config/database.ts";
import { DbUser, User } from "../../types/user.ts";

export default class UserHandler {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("user");
  }

  async getUser(id: string) {
    const user = await this.collection.findOne<DbUser>({ id });

    if (!user) return null;

    return {
      ...user,
      ytRefreshToken: user.ytRefreshToken === "true",
    };
  }

  async addUser(user: User) {
    const addUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: null,
      picture: user.picture,
      ytAuth: null,
    };
    await this.collection.insertOne(addUser);
    return await this.getUser(user.id);
  }

  async setUsername(email: string, username: string) {
    return await this.collection.updateOne(
      { email },
      { $set: { username: username } },
    );
  }

  async setYtRefreshToken(email: string, ytRefreshToken: string) {
    return await this.collection.updateOne(
      { email },
      { $set: { ytRefreshToken: ytRefreshToken } },
    );
  }
}
