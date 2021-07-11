import { FastifyReply } from "fastify";
import * as jwt from "jsonwebtoken";
import { UserRole } from "../types/types";

const convert = ({ limit, offset }) => {
  if (limit > 50) limit = 50;

  return {
    limit: parseInt(limit) || 10,
    offset: parseInt(offset) || 0,
  };
};

const CheckRole = (token: string, reply: FastifyReply) => {
  /*
   * if no token, then throws an error
   * and also checks if the user's role is "member",
   * if true, throws an error
   *
   * then i catch it and send "Unauthorized" back
   */

  try {
    const { role } = jwt.decode(token) as {
      role: UserRole;
    };

    if (!token) throw Error;
    if (role == "member") throw Error;
  } catch (err) {
    reply.code(401).send("Unauthorized");
  }
};

export { convert, CheckRole };
