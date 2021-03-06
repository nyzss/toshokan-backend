import { FastifyInstance } from "fastify";
import {
  AddNovelController,
  AddTagsController,
  AddTagToNovelController,
  DeleteTagController,
  GetAllNovelsController,
  GetAllTagsController,
  GetSingleNovelController,
} from "../Controller/NovelController";

const NovelRoute = (fastify: FastifyInstance, options, done) => {
  //NOVEL HERE
  fastify.get("/novel", GetAllNovelsController);

  fastify.get("/novel/:id", GetSingleNovelController);

  fastify.post("/novel/add", AddNovelController);

  //TAG HERE
  fastify.get("/novel/tag", GetAllTagsController);

  fastify.delete("/novel/tag/:id", DeleteTagController);

  fastify.post("/novel/tag", AddTagsController);

  fastify.put("/novel/tag", AddTagToNovelController);

  done();
};

export default NovelRoute;
