import { Collection } from "mongo";
import { getDb } from "../../config/database.ts";

export default class dbRoom {
  private collection: Collection;
  constructor() {
    this.collection = getDb().collection("room");
  }

  async createRoom({}){

  }
}
