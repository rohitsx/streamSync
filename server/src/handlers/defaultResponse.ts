export const invalidRequest = () =>
  new Response("Invalid_Request", { status: 400 });

export const notFound = () => new Response("Not Found", { status: 404 });

export const userNameNotFound = () =>
  new Response("require_username", { status: 404 });
