import { Novel, Tags } from "../../entity/NovelEntity";

interface TagBody {
  body: {
    title: string;
    description: string;
  };
}

const GetAllNovelsController = async (req, reply) => {
  try {
    //take for the limit
    //skip for the offset
    const allNovels = await Novel.find();

    reply.send(allNovels);
  } catch (error) {
    console.log(error);
    reply.send("Error at fetching all novels!");
  }
};

const AddNovelController = async (req, reply) => {
  try {
    const tag1 = await Tags.create({
      title: "Weak to strong",
      description: "When the protagonist becomes strong later in the story",
    }).save();

    const tag2 = await Tags.create({
      title: "Xuan Huan",
      description:
        "A broad genre of fictional stories which remixes Chinese folklore/mythology with foreign elements & settings.",
    }).save();

    const novel = await Novel.create({
      title: "Super God Gene",
      description:
        "The future unfolded on a magnificent scale into the Interstellar Age. Humanity finally solved the space warp technology, but when humanity transported themselves into the other end, they discovered that place neither had a past nor future, nor was there any land under the starry skies…… The mysterious sanctuary was actually a world filled with countless tyrannical unusual organisms. Humanity faced their great leap in evolution, starting the most glorious and resplendant new era under the starry skies. “Slaughtered the God Blood organism ‘Black Beetle’. Received the God Blood Black Beetle’s Beast Soul. Used the God Blood Black Beetle’s flesh. Randomly obtaining 0 to 10 points of God Gene(s).”",
      author: "Twelve-Winged Dark Seraphim",
      tags: [tag1, tag2],
    }).save();

    reply.send(novel);
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

const AddTagsController = async (req: TagBody, reply) => {
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

const GetSingleNovelController = async (req, reply) => {
  try {
    const allNovels = await Novel.find({
      relations: ["tags"],
    });

    reply.send(allNovels);
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
