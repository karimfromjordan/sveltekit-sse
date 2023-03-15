function create_message(fields) {
  return Object.entries(fields).map(([key, value]) => `${key}: ${value}`).join("\n") + "\n\n";
}

function create_sse({ max_clients = 1_000, max_connections_per_client = 3 } = {}) {
  const clients = new Map();

  return {
    connect(client_id) {
      if (clients.size >= max_clients) {
        return
      }

      if (clients.has(client_id) === false) {
        clients.set(client_id, []);
      }

      const controllers = clients.get(client_id);

      if (controllers.length >= max_connections_per_client) {
        return;
      }

      let controller;

      const stream = new ReadableStream({
        start(_controller) {
          controller = _controller;
          controllers.push(controller);
        },
        cancel() {
          const index = controllers.indexOf(controller);

          if (index !== -1) {
            controllers.splice(index, 1);
          }

          if (controllers.length === 0) {
            clients.delete(client_id);
          }
        }
      });

      return stream;
    },

    send(client_id, { event, data, id, retry }) {
      const controllers = clients.get(client_id);

      if (!controllers) {
        return
      }

      const message = create_message({ event, data, id, retry });

      controllers.forEach(c => c.enqueue(message));
    },

    sendAll({ event, data, id, retry }) {
      const message = create_message({ event, data, id, retry });

      for (const [client_id, controllers] of clients) {
        controllers.forEach(c => c.enqueue(message));
      }
    }
  }
}

const sse = create_sse();

export default sse;