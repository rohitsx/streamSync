import { JWT_SECRET } from "../config/environment.ts";
import { DbUser, User } from "../types/user.ts";
import { invalidRequest } from "./defaultResponse.ts";
import { userNameNotFound } from "./defaultResponse.ts";
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
    const fetchUserData = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const user: User = await fetchUserData.json();

    const getUser: DbUser | null = await this.db.getUser(user.email);

    return getUser ? this.sendSessionToken(getUser) : this.addUser(user);
  }

  sendSessionToken(user: DbUser) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    return user.username
      ? new Response(token, { status: 200 })
      : userNameNotFound();
  }

  addUser(user: User) {
    this.db.addUser(user);
    return userNameNotFound();
  }
}
