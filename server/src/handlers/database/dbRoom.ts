import { Collection } from "mongo";
import { getDb } from "../../config/database.ts";
import { DbRoomCreateProp } from "../../types/types.ts";

export default class dbRoom {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("room");
  }

  async create({ streamId, username }: DbRoomCreateProp) {
    return await this.collection.insertOne({
      streamId,
      username,
      users: [null],
    });
  }

  async detete(username: string) {
    return await this.collection.deleteOne({ username });
  }

  async checkStream(streamId: string) {
    return await this.collection.findOne({ streamId });
  }
}
