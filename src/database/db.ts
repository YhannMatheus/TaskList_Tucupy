import 'dotenv/config';
import { Task } from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from '@libsql/client';
import { eq } from 'drizzle-orm';


const client = createClient({ url : process.env.DATABASE_URL!});
const db = drizzle({ client });


export async function getTask(title: string){
    // função para buscar uma task 
    let task = await db.select({id : Task.id ,title: Task.title, description : Task.description}).from(Task).where(eq(Task.title, title));
    if(task.length > 0){
        return task;
    }
    return null;
}

export async function createTask(title: string, description: string){
    // função para criar uma task
    const task = {
        title: title,
        description: description
    }
    // tratamento de erro no banco de dados
    let verificationTask = getTask(title);
    if (verificationTask === null ){
        // tratamento do erro de ausencia dos dados necessários
        if (title === "" || description === ""){
            return null;
        }
        await db.insert(Task).values({title: task.title, description: task.description}).returning();
        return task;
    }
    return null;
}

export async function deleteTask(title: string){
    // função para deletar uma task
    let task = await db.delete(Task).where(eq(Task.title, title));
    
    if(getTask(title) === null){
        return "Task_Deleted Successfully";
    }
    return null;
}

export async function updateTask(title: string, description: string){
    // função para atualizar uma task
    let task = {
        title: title,
        description: description
    }
    // verificação de existência da task
    let verificationTask = getTask(title);
    if (verificationTask === null){
        return null;
    }
    // realização da atualização
    await db.update(Task).set({title: task.title, description: task.description}).where(eq(Task.title, title));
    return task;
}