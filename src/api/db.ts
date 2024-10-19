import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({
  connection: {
    url: 'file:./drizzle/db.sqlite',
  },
  casing: 'snake_case',
});
