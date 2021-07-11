import { FastifyReply, FastifyRequest } from "fastify";
import { Novel, Tags } from "../../entity/NovelEntity";
import {
  AddNovelBodyInterface,
  IDInterface,
  NovelQueryInterface,
  TagBodyInterface,
} from "../../types/types";
import { CheckRole, convert } from "../utils";

const GetAllNovelsController = async (
  req: FastifyRequest<{ Querystring: NovelQueryInterface }>,
  reply: FastifyReply
) => {
  try {
    const { limit, offset } = convert(req.query);

    //take for the limit
    //skip for the offset
    const allNovels = await Novel.find({
      take: limit,
      skip: offset,
    });

    reply.send({ total: allNovels.length, offset, limit, data: allNovels });
  } catch (error) {
    console.log(error);
    // reply.send("Error at fetching all novels!");
    reply.send(error);
  }
};

const AddNovelController = async (
  req: FastifyRequest<{ Body: AddNovelBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    const { title, description, author } = req.body;
    const { token } = req.cookies;

    CheckRole(token, reply);

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
    reply.code(401).send("Unauthorized");
  }
};

const AddTagsController = async (
  req: FastifyRequest<{ Body: TagBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    const { token } = req.cookies;

    CheckRole(token, reply);

    const { title, description } = req.body;

    if (!title || !description) {
      return reply
        .code(400)
        .send(
          "Please make sure to fill all fields when requesting to add a tag."
        );
    }

    const newTag = await Tags.create({
      title,
      description,
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

    const singleNovel = await Novel.findOneOrFail({
      where: {
        id,
      },
      relations: ["tags", "readers"],
    }).catch(() => {
      return reply
        .code(400)
        .send("Cannot find any novel that matches the provided id.");
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
