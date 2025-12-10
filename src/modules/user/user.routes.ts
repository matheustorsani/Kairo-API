import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middlewares/auth.middleware";
import UserController from "./user.controller";

const controller = new UserController();

export async function userRoutes(app: FastifyInstance) {
  app.get("/me", { preHandler: authMiddleware }, controller.me);
}
