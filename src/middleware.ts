import { createMiddleware } from '@solidjs/start/middleware';
import { getSession } from './api/session';
import { redirect } from '@solidjs/router';

export default createMiddleware({
  onRequest: [
    async (event) => {
      const pathname = new URL(event.request.url).pathname;

      const session = await getSession();
      const userId = session.data.userId;

      if (pathname === '/login' && userId) {
        return redirect('/', 302);
      }
    },
  ],
});
