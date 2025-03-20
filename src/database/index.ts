import { error } from "elysia";
import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { taskTable } from "./schema";
import { eq } from "drizzle-orm";

const client = createClient({ url: process.env.DATABASE_URL! });
const db = drizzle({ client });

export async function createTask(title: string, description: string) {
  // Função para criar uma task com incerssão de titulo e descrição como parametros
  // tratamento de erro try só retornará 200 : OK se a incerssao for bem sussedida!!
  try {
    await db
      .insert(taskTable)
      .values({ title: title, description: description });
  } catch (error) {
    return console.log(error);
  }
  return { menssage: "200 : OK" };
}

export async function getTask(title: string) {
  try {
    const result = await db
      .selectDistinct({ title: taskTable.title })
      .from(taskTable)
      .orderBy(taskTable.id);
    if (!result) {
      return { erro: "404 : Task not counst " };
    } else {
      return result;
    }
  } catch (error) {
    return console.log(error);
  }
}

export async function deleteTask(title: string) {
  try {
    const result = getTask(title);
    if (result !== null) {
      await db.delete(taskTable).where(eq(taskTable.title, title));
    }
    return result;
  } catch (error) {
    return console.log(error);
  }
}

export async function updateTask(title: string, description: string) {
  try {
  } catch (error) {}
}
