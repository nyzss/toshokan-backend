import { CurrentUser } from "../Schema/UserSchema";

const UserRoute = (fastify, options, done) => {
  fastify.post("/users/:id", CurrentUser);

  done();
};

export default UserRoute;
