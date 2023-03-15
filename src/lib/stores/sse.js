import { writable } from "svelte/store";

function create_sse_store() {
  const { subscribe, set } = writable();

  let event_source;

  return {
    subscribe,

    connect(endpoint) {
      event_source = new EventSource(endpoint);

      event_source.addEventListener('message', (event) => {
        set(JSON.parse(event.data));
      });
    },
  }
}

const sse_store = create_sse_store();

export default sse_store;