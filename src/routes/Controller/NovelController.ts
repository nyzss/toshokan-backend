import { FastifyReply } from "fastify";
import { FastifyRequest } from "fastify";
import { Novel, Tags } from "../../entity/NovelEntity";
import {
  AddNovelBodyInterface,
  IDInterface,
  TagBodyInterface,
  UserRole,
} from "../../types";

import * as jwt from "jsonwebtoken";
import { User } from "../../entity/UserEntity";

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

const CheckRole = (token: string) => {
  /*
   * if no token, then throws an error
   * and also checks if the user's role is "member",
   * if true, throws an error
   */

  const { role } = jwt.decode(token) as {
    role: UserRole;
  };

  if (!token) throw Error;
  if (role == "member") throw Error;
};

const AddNovelController = async (
  req: FastifyRequest<{ Body: AddNovelBodyInterface }>,
  reply: FastifyReply
) => {
  try {
    const { title, description, author } = req.body;
    const { token } = req.cookies;

    CheckRole(token);

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
