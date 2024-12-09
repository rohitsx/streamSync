import { Collection } from "mongo";
import { getDb } from "../../config/database.ts";
import { DbRoomCreateProp } from "../../types/types.ts";

export default class dbRoom {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("room");
  }

  create({ streamId, socketId, username }: DbRoomCreateProp) {
    return this.collection.insertOne({ streamId, socketId, username });
  }
}
