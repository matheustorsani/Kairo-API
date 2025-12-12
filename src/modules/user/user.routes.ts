import { FastifyInstance } from "fastify";
import { authMiddleware } from "../../middlewares/auth.middleware";
import UserController from "./user.controller";
import { userSchema } from "./user.schema";

const controller = new UserController();

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);

  app.get("/me", (req, res) => controller.me(req, res));
  app.patch(
    "/me",
    {
      schema: userSchema.shape.body,
    },
    (req, res) => controller.updateUser(req, res)
  )
}
