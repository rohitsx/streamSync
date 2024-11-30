import { load } from "jsr:@std/dotenv";
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
    console.log(user);
    return this.sendSessionToken(user);
  }

  async sendSessionToken(user: User): Promise<Response> {
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "30d",
    });
    const getUser: DbUser | null = await this.db.getUser(user.id);
    const username_Require = (user: DbUser) => {
     return sendResponse(
        { message: "username_Require", token: token, user: user },
        200,
      );
    };

    console.log("sending user", getUser);

    if (getUser) {
     return getUser.username
        ? sendResponse({ message: "success", token: token, user: getUser }, 200)
        : username_Require(getUser);
    } else {
      const userInstance = await this.db.addUser(user);
     return userInstance
        ? username_Require(userInstance)
        : sendResponse("error", 400);
    }
  }

  async validateToken(_req: Request): Promise<Response> {
    if (_req.method !== "POST") return invalidRequest();

    const token = await _req.text();
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

  async setUsername(_req: Request): Promise<Response> {
    if (_req.method !== "POST") return invalidRequest();
    const { username, sessiontoken, email } = await _req.json();
    try {
      jwt.verify(sessiontoken, JWT_SECRET);
      await this.db.setUsername(email, username);
      console.log("updated username");
      return sendResponse("success", 200);
    } catch (err) {
      console.log("username update failed", err);
      return sendResponse("Invalid_Token", 400);
    }
  }
}
