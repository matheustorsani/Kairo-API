import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "./auth.service";
import { registerSchema, loginSchema } from "./auth.schemas";

export default class AuthController {
  private service = new AuthService();

  register = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = registerSchema.parse(req.body);
      const result = await this.service.register(data);

      return reply.status(201).send(result);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  };

  login = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = loginSchema.parse(req.body);
      const result = await this.service.login(data);

      return reply.status(200).send(result);
    } catch (err: any) {
      return reply.status(400).send({ error: err.message });
    }
  };
};
