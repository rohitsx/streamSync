import { JWT_SECRET } from "../config/environment.ts";
import { DbUser, User } from "../types/user.ts";
import invalidRequest from "./invalidRequest.ts";
import UserHandler from "./userHandler.ts";
import jwt from "jsonwebtoken";

export default class googleAuthhandler {
  db: UserHandler;
  constructor() {
    this.db = new UserHandler();
  }

  async auth(_req: Request): Promise<Response> {
    if (_req.method !== "POST") return invalidRequest();

    const accessToken = await _req.text();
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user: User = await response.json();
    await this.db.addUser(user);
    this.SessionToken(user);

    return new Response("working", { status: 200 });
  }

  async SessionToken(user: User) {
    const response: DbUser | null = await this.db.getUser(user.email);
    if (response) {
      console.log(response.email);
      const token = jwt.sign({ userId: response._id }, JWT_SECRET, {
        expiresIn: "30d",
      });
    }
    return new Response("working", { status: 200 });
  }
}
