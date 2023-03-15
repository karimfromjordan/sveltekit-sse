import sse from "$lib/sse.server.js";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const id = crypto.randomUUID;

  const stream = sse.connect(id);

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}