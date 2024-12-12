import { Collection } from "mongo";
import { getDb } from "../../config/database.ts";
import { DbRoomCreateProp } from "../../types/types.ts";

export default class dbRoom {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("room");
  }

  create({ streamId, username }: DbRoomCreateProp) {
    return this.collection.insertOne({
      streamId,
      username,
      users: [null],
    });
  }

  detete(streamId: string) {
    return this.collection.deleteOne({ streamId });
  }
}
