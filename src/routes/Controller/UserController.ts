import { FastifyRequest } from "fastify";
import { FastifyReply } from "fastify";
import { Novel } from "../../entity/NovelEntity";
import { User } from "../../entity/UserEntity";
import { IDInterface, UserAddReadingListInterface } from "../../types";

const CurrentUserController = async (
  req: FastifyRequest<{ Params: IDInterface }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;

    if (!id) return reply.code(400).send("Please provide an id.");

    const currentUser = await User.findOne({
      where: {
        id,
      },
      relations: ["posts", "list"],
    }).catch(() => reply.code(400).send("No user found with the provided id."));

    reply.send(currentUser);
  } catch (error) {
    console.log("error");
    reply.code(400).send("Error!");
  }
};

const UserAddReadingListController = async (
  req: FastifyRequest<{ Body: UserAddReadingListInterface }>,
  reply: FastifyReply
) => {
  try {
    const { id, novelId } = req.body;

    if (!id || !novelId)
      return reply
        .code(400)
        .send("Please provide both id of the user and the novel.");

    const user = await User.findOne({
      where: {
        id,
      },
    });

    const novel = await Novel.findOne({
      where: {
        id: novelId,
      },
    });

    novel.totalReader += 1;
    user.list = [novel];

    await user.save();
    await novel.save();

    reply.send(user);
  } catch (error) {
    console.log(error);
    reply.code(400).send("Error!");
  }
};

export { CurrentUserController, UserAddReadingListController };
