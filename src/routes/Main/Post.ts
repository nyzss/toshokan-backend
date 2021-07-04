import { PostReturn, PostGet, PostGetAll } from "../Schema/PostSchema";

const PostRoute = (fastify, options, done) => {
  fastify.get("/posts/:id", PostGet); // GET ALL POSTS OF A USER

  fastify.get("/posts", PostGetAll);

  fastify.post("/posts", PostReturn); // ADD POST

  done();
};

export default PostRoute;
