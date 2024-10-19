import { createMiddleware } from '@solidjs/start/middleware';
import { getSession, getUserId } from './api/session';
import { redirect } from '@solidjs/router';

export default createMiddleware({
  onRequest: [
    async (event) => {
      const pathname = new URL(event.request.url).pathname;
      const userId = await getUserId();

      if (pathname === '/login' && userId) {
        return redirect('/', 302);
      }
    },
  ],
});
