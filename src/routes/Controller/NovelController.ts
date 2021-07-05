import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { Novel, Tags } from "../../entity/NovelEntity";
import {
  AddNovelBodyInterface,
  IDInterface,
  TagBodyInterface,
} from "../../types";

const GetAllNovelsController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    //take for the limit
    //skip for the offset
    const allNovels = await Novel.find({
      take: 10, // limiting to 10 for now, i'll make this value changeable in the near future
    });

    reply.send(allNovels);
  } catch (error) {
    console.log(error);
    reply.send("Error at fetching all novels!");
  }
};

const AddNovelController = async (
  req: FastifyRequest<{ Body: AddNovelBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    const { title, description, author } = req.body;

    if (!title || !description || !author) {
      return reply
        .code(400)
        .send("Please make sure to fill every required field.");
    }

    const novel = await Novel.create({
      title,
      description,
      author,
    }).save();

    reply.send(novel);
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

const AddTagsController = async (
  req: FastifyRequest<{ Body: TagBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    const { title, description, novelId } = req.body;

    if (!title || !description) {
      return reply
        .code(400)
        .send(
          "Please make sure to fill all fields when requesting to add a tag."
        );
    }

    const novels = await Novel.find({
      where: {
        id: novelId,
      },
    });

    if (!novels)
      return reply.code(400).send("No novels found with the id you provided!");

    const newTag = await Tags.create({
      title,
      description,
      novels,
    }).save();

    reply.send(newTag);
  } catch (error) {
    console.log(error);
    reply.send(error);
  }
};

const GetSingleNovelController = async (
  req: FastifyRequest<{ Params: IDInterface }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    const singleNovel = await Novel.findOne({
      where: {
        id,
      },
      relations: ["tags", "readers"],
    });

    reply.send(singleNovel);
  } catch (error) {
    console.log(error);
    reply.code(400).send("Error!");
  }
};

export {
  AddNovelController,
  GetAllNovelsController,
  AddTagsController,
  GetSingleNovelController,
};
