import sse from "$lib/sse.server.js"

/** @type {import('./$types').Actions} */
export const actions = {
  async message(event) {
    const data = await event.request.formData();

    const message = JSON.stringify({ type: 'success', message: data.get('message') });

    sse.sendAll({ event: 'message', data: message })
  }
};