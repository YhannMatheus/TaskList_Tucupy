import { Elysia, error } from "elysia";
import { getTask, createTask, updateTask, deleteTask } from "../database/db";
import { Task } from "../database/schema";


const app = new Elysia();

export const routes = (app: Elysia) => { 

    app.post('/tasks/create', async ({body}: { body : {title: string; description : string}})  =>{
        // rota para criação de tasks com tratamentos de erro simples
        const { title , description } = body;
        if( !title || !description){
            return {error : 'insuficiência de dados'};
        }
        try {
            const novaTask = await createTask(title,description);
            return {
                menssage: 'Task criada com sucesso!',
                task : novaTask
            };
        }
        catch (error) {
            return{ 
                error : 'Erro na conclusão da ação. Tente novamente mais tarde',
                details : error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }});
    
    app.put('/tasks/update/:id', async ({ params , body } : {params:{id:number}; body:{title? : string ; description? : string} }) =>{
        const {id} = params;
        const { title, description} = body;

        if (!id){
            return {error : 'Não consta ID nos parametros'};
        }
        if(!title || !description){
            return {error : 'Ao menos 1 dos parametros (title ou description) devem ser passados'};
        }

        try{
            const taskAtualizada = await updateTask(title,description);
            if (taskAtualizada){
                return {message : 'Task atualizada com sucesso', task : taskAtualizada};
            }
            else{
                return {error : 'Task não encontrada'};
            }    
        }catch (error){
            return {
                error: 'Erro ao atualizar a task. Tente novamente mais tarde.',
                details: error instanceof Error ? error.message : 'Erro desconhecido',
              };
        }
    });

    app.delete('/task/delete/:title', async ({ params }:{ params : {title : string}}) =>{
        const {title} = params;

        if (!title){
            return{ error : 'Ausencia de parametro excencial para execução'};
        }
        try{
            const TaskDeleted = await deleteTask(title);
            if (TaskDeleted){
                return {message:'Task deletada com sucesso!', task: TaskDeleted};
            }else{
                return {error :'Task não encontrada'};
            }
        }catch(error){
            return {
                error: 'Erro ao deletar task, tente novamente',
                details: error instanceof Error? error.message : 'Erro desconhecido',
            };
        }
    });

    app.get('/task/:title', async ({ params }:{params : { title? :string }})=>{
        const { title } = params;

        if (!title){
            return {error: " Ausência de parametros excenciais para execução"};
        }

        try{
            const task = await getTask(title);
            
            if (task){
                return task;
            }else{
                return {error:' Task não encontrada, titulo fornecido pode estar errado'};
            }
        }catch(error){
        return {
            error: 'Erro ao deletar task, tente novamente',
            details: error instanceof Error? error.message : 'Erro desconhecido',
        };

        }
    });
};
