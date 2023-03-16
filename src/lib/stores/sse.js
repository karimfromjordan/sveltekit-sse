import { browser } from "$app/environment";
import { writable } from "svelte/store";

function create_sse_store() {
  let event_source;

  const { subscribe, set } = writable(null, () => {
    if (browser) {
      connect();
    }

    return close;
  });


  function connect() {
    event_source = new EventSource('/sse');

    event_source.addEventListener('message', (event) => {
      set(JSON.parse(event.data));
    });
  }

  function close() {
    event_source?.close();
  }

  return {
    subscribe,
  }
}

const sse_store = create_sse_store();

export default sse_store;