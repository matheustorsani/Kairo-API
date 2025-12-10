import fastify from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";

const app = fastify();

app.get("/", () => {
  return { message: "API rodando!" };
});

app.decorateRequest("user", null);

app.register(authRoutes, { prefix: "auth" });

app.register(userRoutes, { prefix: "user" });

app.listen({ port: 3333 }).then(() => {
  console.log("Servidor rodando na porta 3333");
});