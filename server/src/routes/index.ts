import routerHandler from "./api.ts";

export default function router(_req: Request) {
  const api = new routerHandler(_req);
  return api.routes();
}
