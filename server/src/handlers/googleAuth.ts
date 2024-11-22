import { User } from "../types/user.ts";
import invalidRequest from "./invalidRequest.ts";
import UserHandler from "./userHandler.ts";

export default class googleAuthhandler {
  db: UserHandler;
  constructor() {
    this.db = new UserHandler();
  }

  async auth(_req: Request): Promise<Response> {
    if (_req.method !== "POST") return invalidRequest();

    const user: User = await _req.json();

    const userExits = await this.db.getUser(user.email);
    if (userExits) return this.SessionToken(user);

    return new Response("working", { status: 200 });
  }

  async SessionToken(user: User) {
    return new Response("working", { status: 200 });
  }
}
