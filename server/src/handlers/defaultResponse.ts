import { User } from "../types/user.ts";

export default function sendResponse(m: string | object, s: number) {
  return new Response(JSON.stringify(m), {
    status: s,
    headers: { "Content-Type": "application/json" },
  });
}

export const invalidRequest = () => sendResponse("Invalid_Request", 400);
export const notFound = () => sendResponse("Not_Found", 404);
export const userNameNotFound = ({
  token,
  user,
}: {
  token: string;
  user: User;
}) =>
  sendResponse({ message: "username_Require", token: token, user: user }, 200);
