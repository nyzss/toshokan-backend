import { FastifyInstance } from "fastify";
import {
  CheckController,
  LoginController,
  LogoutController,
  RegisterController,
} from "../Controller/AuthController";

const AuthRoute = (fastify: FastifyInstance, options, done) => {
  fastify.post("/auth/login", LoginController);

  fastify.post("/auth/register", RegisterController);

  fastify.get("/auth/logout", LogoutController);

  fastify.get("/auth/check", CheckController);

  done();
};

export default AuthRoute;
