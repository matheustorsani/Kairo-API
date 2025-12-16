import fastify from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { taskRoutes } from "./modules/task/task.routes";


const app = fastify();

app.withTypeProvider<ZodTypeProvider>();

app.get("/", () => {
  return { message: "API rodando!" };
});

app.register(authRoutes, { prefix: "auth" });
app.register(userRoutes, { prefix: "user" });
app.register(taskRoutes, { prefix: "tasks" });


app.listen({ port: 3333 }).then(() => {
  console.log("Servidor rodando na porta 3333");
});