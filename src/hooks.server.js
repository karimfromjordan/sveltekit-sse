/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  event.locals.user = event.cookies.get('user');

  if (!event.locals.user) {
    event.cookies.set('user', crypto.randomUUID());
  }

  const response = await resolve(event);

  return response;
}