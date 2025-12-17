import { createTaskSchema } from "./task.schema";
import { TaskService } from "./task.service";
import { FastifyRequest, FastifyReply } from "fastify";

export class TaskController {
  private service = new TaskService();

  create = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const data = createTaskSchema.parse(req.body);

      const task = await this.service.create((req as any).user.id, data);

      return res.status(201).send({
        message: "Tarefa criada com sucesso!",
        task
      });
    } catch (err: any) {
      return res.status(400).send({ error: err.message });
    }
  }

  getAll = async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req as any).user.id;
    if (!userId) throw new Error("Usuário não autenticado.");

    const task = await this.service.getAll(userId) ?? null;

    if (!task) throw new Error("Nenhuma tarefa encontrada.");

    return res.status(200).send(task)
  }

  getById = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const task = await this.service.getById((req as any).user.id, id);

    if (!task) throw new Error("Tarefa não encontrada.");

    return res.status(200).send(task)
  }

  update = async (req: FastifyRequest, res: FastifyReply) => {
    // vai entender pq no getById ele retorna null e aqui não
    try {
      const { id } = req.params as { id: string };
      const task = await this.service.update(id, req.body);

      return res.status(200).send({
        message: "Tarefa atualizada com sucesso!",
        task
      });
    } catch {
      throw new Error("Tarefa não encontrada.")
    }
  }

  delete = async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    await this.service.delete(id);
    return res.status(200).send({
      message: "Tarefa deletada com sucesso!"
    });
  }

  getByFilter = async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req as any).user.id;
    if (!userId) throw new Error("Usuário não autenticado.");
    const filter = req.query as any;

    const tasks = await this.service.getByFilter(userId, filter);

    if (tasks.length === 0) throw new Error("Nenhuma tarefa encontrada.");

    return res.status(200).send(tasks)
  }
}