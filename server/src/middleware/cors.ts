export default async function addCorsHeaders(
  req: Request,
  handler: () => Promise<Response>,
): Promise<Response> {
  const response = await handler();
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle pre-flight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers, status: 204 });
  }

  // Ensure the status code is explicitly passed along with headers
  return new Response(response.body, { status: response.status, headers });
}
