import { FastifyInstance } from "fastify";
import {
  AddNovelController,
  AddTagsController,
  GetAllNovelsController,
  GetSingleNovelController,
} from "../Controller/NovelController";

const NovelRoute = (fastify: FastifyInstance, options, done) => {
  fastify.get("/novel", GetAllNovelsController);

  fastify.get("/novel/:id", GetSingleNovelController);

  fastify.post("/novel/add", AddNovelController);

  fastify.post("/novel/tag", AddTagsController);

  done();
};

export default NovelRoute;
