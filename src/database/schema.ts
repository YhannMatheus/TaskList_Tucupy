import {int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const taskTable = sqliteTable('task', {
  id: int().primaryKey({ autoIncrement: true}),
  title: text().notNull(),
  description: text().notNull(),
});