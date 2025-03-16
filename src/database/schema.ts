import {int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const Task = sqliteTable('task', {
  id: int().primaryKey({ autoIncrement: true}),
  title: text(),
  description: text(),});
