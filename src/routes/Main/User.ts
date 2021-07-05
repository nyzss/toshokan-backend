import { CurrentUser, UserAddReading } from "../Schema/UserSchema";

const UserRoute = (fastify, options, done) => {
  fastify.post("/users/novel/add", UserAddReading);

  fastify.get("/users/:id", CurrentUser);
  done();
};

export default UserRoute;
