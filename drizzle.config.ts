import { Config } from 'drizzle-kit';

export default {
  dialect: 'turso',
  schema: './drizzle/schema.ts',
  out: './drizzle/migrations/',
  dbCredentials: {
    url: 'file:./drizzle/db.sqlite',
  },
  casing: 'snake_case',
} satisfies Config;
