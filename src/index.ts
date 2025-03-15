import 'dotenv/config';
import { Elysia } from "elysia";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from '@libsql/client';

const client = createClient({ url : process.env.DATABASE_URL!});
const db = drizzle({ client });
const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
