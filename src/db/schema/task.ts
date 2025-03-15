import {int, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
  id: int().primaryKey({ autoIncrement: true}),
  title: text(),
  description: text(),
  completed: int().default(0),});

