import { Post } from "../../entity/PostEntity";
import { User } from "../../entity/UserEntity";

interface AddPost {
  body: {
    title: string;
    content: string;
    id: string;
  };
}

interface UserId {
  params: {
    id: string;
  };
}

const PostGetController = async (req: UserId, reply: any) => {
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

const PostGetAllController = async (req, reply) => {
  try {
    const allPosts = await Post.find();
    reply.send(allPosts);
  } catch (error) {
    console.log(error);
    reply.code(400).send("Error!");
  }
};

const AddPostController = async (req: AddPost, reply) => {
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
