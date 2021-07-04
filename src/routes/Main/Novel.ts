import {
  AddNovel,
  GetAllNovels,
  AddTags,
  GetSingleNovel,
} from "../Schema/NovelSchema";

const NovelRoute = (fastify, options, done) => {
  fastify.get("/novel", GetAllNovels);

  fastify.get("/novel/:id", GetSingleNovel);

  fastify.post("/novel/add", AddNovel);

  fastify.post("/novel/tag", AddTags);

  done();
};

export default NovelRoute;
