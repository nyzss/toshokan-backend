import { AuthLogin, AuthLogout, AuthRegister } from "../Schema/AuthSchema";

const AuthRoute = (fastify, options, done) => {
  fastify.post("/auth/login", AuthLogin);

  fastify.post("/auth/register", AuthRegister);

  fastify.get("/auth/logout", AuthLogout);
  done();
};

export default AuthRoute;
