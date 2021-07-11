import { FastifyReply, FastifyRequest } from "fastify";
import { Post } from "../../entity/PostEntity";
import { User } from "../../entity/UserEntity";
import { AddPostInterface, IDInterface } from "../../types/types";

const PostGetController = async (
  req: FastifyRequest<{ Params: IDInterface }>,
  reply: FastifyReply
) => {
  try {
    const UsersPosts = await Post.find({
      where: {
        user: {
          id: req.params.id,
        },
      },
    });

    reply.send(UsersPosts);
  } catch (error) {
    reply.code(400).send("Error!");
    console.error(error);
  }
};

const PostGetAllController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const allPosts = await Post.find();
    reply.send(allPosts);
  } catch (error) {
    console.log(error);
    reply.code(400).send("Error!");
  }
};

const AddPostController = async (
  req: FastifyRequest<{ Body: AddPostInterface }>,
  reply: FastifyReply
) => {
  try {
    const { title, content, id } = req.body;

    const user = await User.findOneOrFail({ id });

    const newPost = await Post.create({
      title,
      content,
      user,
    }).save();

    reply.send(newPost);
  } catch (error) {
    console.log("error");
    reply.code(400).send("Error!");
  }
};

export { AddPostController, PostGetController, PostGetAllController };
