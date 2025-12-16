import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";

const controller = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", controller.register);
  app.post("/login", controller.login)
  app.post("/refresh", controller.refresh);
  app.post("/logout", controller.logout);
};
