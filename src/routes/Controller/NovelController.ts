import { FastifyReply, FastifyRequest } from "fastify";
import { Novel, Tags } from "../../entity/NovelEntity";
import {
  AddNovelBodyInterface,
  IDInterface,
  NovelQueryInterface,
  TagBodyInterface,
  TagNovelInterface,
} from "../../types/types";
import { convert } from "../utils";

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
    const {
      title,
      description,
      author,
      coverUrl,
      artist,
      chapter,
      language,
      type,
      status,
      releaseYear,
    } = req.body;
    // const { token } = req.cookies;

    // CheckRole(token, reply);

    if (!title || !description || !author)
      throw "Please make sure to fill every required field.";

    const novel = await Novel.create({
      title,
      description,
      author,
      artist,
      coverUrl,
      chapter,
      language,
      type,
      status,
      releaseYear,
    }).save();

    reply.send(novel);
  } catch (error) {
    console.log(error);
    reply.code(401).send(error || "Error!");
  }
};

const AddTagsController = async (
  req: FastifyRequest<{ Body: TagBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    // const { token } = req.cookies;

    // CheckRole(token, reply);

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
    reply.code(500).send(error);
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

const GetAllTagsController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const allTags = await Tags.find();

    reply.send(allTags);
  } catch (error) {
    reply.code(400).send("Couldn't find any tags!");
  }
};

const DeleteTagController = async (
  req: FastifyRequest<{ Params: IDInterface }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    const deleted = await Tags.delete(id);

    reply.send(deleted);

    reply.send(id);
  } catch (error) {
    reply.code(400).send("Tag does not exist or the provided id is invalid!");
  }
};

const AddTagToNovelController = async (
  req: FastifyRequest<{ Body: TagNovelInterface }>,
  reply: FastifyReply
) => {
  try {
    const { novelId, tagId } = req.body;

    const novel = await Novel.findOneOrFail(novelId, {
      relations: ["tags"], //adding the relation so that i can just push to the novel.tags the new tag
    });

    const tag = await Tags.findOneOrFail(tagId);

    novel.tags = [...novel.tags, tag]; //idk if it is slower or not, anyway i'm going with this as it's more readable for me

    // novel.tags.push(tag);

    const savedNovel = await novel.save();

    reply.send(savedNovel);
  } catch (error) {
    console.log(error);
    // reply.code(400).send(error);
    reply.code(400).send("Couldn't find tag or novel!");
  }
};

export {
  AddNovelController,
  GetAllNovelsController,
  AddTagsController,
  GetSingleNovelController,
  GetAllTagsController,
  DeleteTagController,
  AddTagToNovelController,
};
