import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).send({ error: "Um token é necessário" });
  const token = auth.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    (req as any).user = { id: decoded.sub };
  } catch (err: any) {
    return res.status(401).send({ error: "Token inválido." });
  }
}