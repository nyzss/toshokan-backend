import { FastifyInstance } from "fastify";
import {
  AddPostController,
  PostGetAllController,
  PostGetController,
} from "../Controller/PostController";

const PostRoute = (fastify: FastifyInstance, options, done) => {
  fastify.get("/posts/:id", PostGetController); // GET ALL POSTS OF A USER

  fastify.get("/posts", PostGetAllController);

  fastify.post("/posts", AddPostController); // ADD POST

  done();
};

export default PostRoute;
