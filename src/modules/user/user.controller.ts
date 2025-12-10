import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";

const service = new UserService();

export default class UserController {
  async me(req: FastifyRequest, res: FastifyReply) {
    const userId = (req as any).user.id;
    if (!userId) return res.status(401).send({ error: "Usuário não autenticado."});

    const user = await service.getProfile(userId);

    return res.status(200).send({
      message: "Perfil carregado com sucesso!",
      user
    });
  }
} 