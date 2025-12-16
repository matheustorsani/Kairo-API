import { FastifyInstance } from "fastify";
import { TaskController } from "./task.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createTaskSchema, updateTaskSchema } from "./task.schema";

const controller = new TaskController();

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);

  app.post("/", controller.create);
  app.get("/", controller.getAll);
  app.get("/:id", controller.getById);
  app.put("/:id", controller.update);
  app.delete("/:id", controller.delete);
}