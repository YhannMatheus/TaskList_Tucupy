import { Elysia, error } from "elysia";
import { getTask, createTask, updateTask, deleteTask } from "./database/db";

const app = new Elysia();

export const routes = (app: Elysia) => {
    app.post('/tasks/create/:id', async ({ params, body }: { params: { id: number }; body: { title: string; description: string } }) => {
        const { title, description } = body;
        const { id } = params;

        if (!title || !description) {
            return { error: 'Insuficiência de dados' };
        }

        try {
            const novaTask = await createTask(title, description);
            return {
                message: 'Task criada com sucesso!',
                task: novaTask
            };
        } catch (error) {
            return {
                error: 'Erro na conclusão da ação. Tente novamente mais tarde',
                details: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    });

    app.put('/tasks/update/:id', async ({ params, body }: { params: { id: number }; body: { title: string; description: string } }) => {
        const { id } = params;
        const { title, description } = body;

        if (!id) {
            return { error: 'Não consta ID nos parâmetros' };
        }
        if (!title && !description) {
            return { error: 'Ao menos 1 dos parâmetros (title ou description) devem ser passados' };
        }

        try {
            const taskAtualizada = await updateTask(id, title, description);
            if (taskAtualizada) {
                return { message: 'Task atualizada com sucesso', task: taskAtualizada };
            } else {
                return { error: 'Task não encontrada' };
            }
        } catch (error) {
            return {
                error: 'Erro ao atualizar a task. Tente novamente mais tarde.',
                details: error instanceof Error ? error.message : 'Erro desconhecido',
            };
        }
    });

    app.delete('/task/delete/:title', async ({ params }: { params: { title: string } }) => {
        const { title } = params;

        if (!title) {
            return { error: 'Ausência de parâmetro essencial para execução' };
        }
        try {
            const TaskDeleted = await deleteTask(title);
            if (TaskDeleted) {
                return { message: 'Task deletada com sucesso!', task: TaskDeleted };
            } else {
                return { error: 'Task não encontrada' };
            }
        } catch (error) {
            return {
                error: 'Erro ao deletar task, tente novamente',
                details: error instanceof Error ? error.message : 'Erro desconhecido',
            };
        }
    });

    app.get('/task/:title', async ({ params }: { params: { title?: string } }) => {
        const { title } = params;

        if (!title) {
            return { error: "Ausência de parâmetros essenciais para execução" };
        }

        try {
            const task = await getTask(title);

            if (task) {
                return task;
            } else {
                return { error: 'Task não encontrada, título fornecido pode estar errado' };
            }
        } catch (error) {
            return {
                error: 'Erro ao buscar task, tente novamente',
                details: error instanceof Error ? error.message : 'Erro desconhecido',
            };
        }
    });
};

app.listen(3000);
console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);