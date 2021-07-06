import { FastifyInstance } from "fastify";
import {
  CurrentUserController,
  UserAddReadingListController,
} from "../Controller/UserController";

const UserRoute = (fastify: FastifyInstance, options, done) => {
  fastify.post("/users/novel/add", UserAddReadingListController);

  fastify.get("/users/:id", CurrentUserController);
  done();
};

export default UserRoute;
