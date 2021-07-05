import { FastifyInstance } from "fastify";
import { CurrentUser, UserAddReading } from "../Schema/UserSchema";

const UserRoute = (fastify: FastifyInstance, options, done) => {
  fastify.post("/users/novel/add", UserAddReading);

  fastify.get("/users/:id", CurrentUser);
  done();
};

export default UserRoute;
