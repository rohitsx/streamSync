import { JWT_SECRET } from "../config/environment.ts";
import { DbUser, User } from "../types/user.ts";
import sendResponse, { invalidRequest } from "./defaultResponse.ts";
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

    return this.sendSessionToken(user);
  }

  async sendSessionToken(user: User): Promise<Response> {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    const getUser: DbUser | null = await this.db.getUser(user.email);
    const username_Require = () =>
      sendResponse(
        { message: "username_Require", token: token, user: getUser },
        200,
      );

    return getUser
      ? getUser.username
        ? sendResponse({ message: "success", token: token, user: getUser }, 200)
        : username_Require()
      : (await this.db.addUser(user)) && username_Require();
  }

  async validateToken(_req: Request): Promise<Response> {
    if (_req.method !== "POST") return invalidRequest();

    const token = await _req.text();
    console.log(token);
    if (!token) return sendResponse("Invalid_Token", 400);

    try {
      jwt.verify(token, JWT_SECRET);
      console.log("succes token");
      return sendResponse("validateToken", 200);
    } catch {
      console.log("error token");
      return sendResponse("Invalid_Token", 400);
    }
  }
}
