import sse from "$lib/sse.server.js";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const id = crypto.randomUUID();

  const stream = sse.connect(id, (id, controllers) => {
    if (controllers.length) return;
    
    const data = JSON.stringify({ type: 'success', message: `Client ${id} disconnected` });

    sse.send_to_all({ event: 'message', data })
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
    },
  });
}