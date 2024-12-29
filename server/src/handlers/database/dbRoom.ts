import { Collection, PushOperator } from "mongo";
import { getDb } from "../../config/database.ts";
import { DbRoomCreateProp, DeleteUserProp } from "../../types/types.ts";
import { dbRoomUserProp, RoomUsersProp } from "../../types/user.ts";

export default class dbRoom {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("room");
  }

  async create({ streamId, username }: DbRoomCreateProp) {
    return await this.collection.insertOne({
      streamId,
      username,
      users: [],
    });
  }

  async detete({ username, streamId }: DeleteUserProp) {
    if (streamId) {
      const deleteUser: PushOperator<RoomUsersProp> = {
        $pull: { users: username },
      };
      return this.collection.updateOne({ streamId }, deleteUser);
    }
    return await this.collection.deleteOne({ username });
  }

  async checkStream(streamId: string) {
    return await this.collection.findOne({ streamId });
  }

  async getUser({ username, streamId }: dbRoomUserProp) {
    return await this.collection.findOne({
      streamId,
      "users.username": username,
    });
  }

  async join({ username, streamId }: dbRoomUserProp) {
    const userExists = await this.getUser({ username, streamId });
    console.log("userExists", userExists);
    if (userExists) return false;

    const addUser: PushOperator<RoomUsersProp> = { $push: { users: username } };

    return this.collection.updateOne({ streamId }, addUser);
  }
}
