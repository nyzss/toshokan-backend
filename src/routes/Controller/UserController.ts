import { Post } from "../../entity/Post";
import { User } from "../../entity/User";

const CurrentUserController = async (req , reply) => {
  try {


    reply.send("user here");
    
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

export { CurrentUserController };
