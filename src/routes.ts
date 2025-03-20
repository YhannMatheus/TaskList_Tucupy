import { Elysia, error, t } from "elysia";
import {getTask,deleteTask, createTask,updateTask} from './database/index'
import { task } from "./database/models";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(swagger());

app.post(
  "/task/create",
  async ({ body }) => {
     await createTask(body.title,body.description)
  },
  {
    body: t.Object({
      title: t.String(),
      description: t.String(),
    }),
  }
);

app.get(
  "/task/get",
  async ({ body }) => {
    await getTask(body.title)
  },
  {
    body: t.Object({
      title: t.String(),
      description: t.String(),
    }),
  }
);

app.put(
  "/task/update",
  async ({ body }) => {
    await updateTask(body.title,body.description)
  },
  {
    body: t.Object({
      id: t.Number(),
      title: t.String(),
      description: t.String(),
    }),
  }
);

app.delete(
  "/task/delete",
  async ({ body }) => {
    await deleteTask(body.title)
  },
  {
    body: t.Object({
      title: t.String(),
      description: t.String(),
    }),
  }
);

app.listen(3000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
