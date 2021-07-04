import { Post } from "../../entity/PostEntity";
import { User } from "../../entity/UserEntity";

const CurrentUserController = async (req, reply) => {
  try {
    reply.send("user here");
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

export { CurrentUserController };
