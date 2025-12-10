import { FastifyInstance } from "fastify";
import AuthController from "./auth.controller";

const controller = new AuthController();

export async function authRoutes(app: FastifyInstance) {
  app.post("/register", async (req, res) => {
    return controller.register(req, res);
  })
  app.post("/login", async (req, res) => {
    return controller.login(req, res);
  });
};
