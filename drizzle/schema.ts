import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: integer().primaryKey().unique().notNull(),
  username: text().notNull().default(''),
  password: text().notNull().default(''),
});
