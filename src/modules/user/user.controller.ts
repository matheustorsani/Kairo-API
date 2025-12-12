import { FastifyRequest, FastifyReply } from "fastify";
import { UserService } from "./user.service";
import { UpdatedUser } from "./user.schema";

export default class UserController {
  private service = new UserService();

  async me(req: FastifyRequest, res: FastifyReply) {
    const userId = (req as any).user.id;
    if (!userId) return res.status(401).send({ error: "Usuário não autenticado." });

    const user = await this.service.getProfile(userId);

    return res.status(200).send({
      message: "Perfil carregado com sucesso!",
      user
    });
  }

  async updateUser(req: FastifyRequest, res: FastifyReply) {
    const userId = (req as any).user.id;

    const up = await this.service.updateProfile(userId, req.body);

    return res.status(200).send({
      message: "Perfil atualizado com sucesso!",
      user: up
    });
  }
} 