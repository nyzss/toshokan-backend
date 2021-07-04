import {
  AddNovelController,
  GetAllNovelsController,
  AddTagsController,
  GetSingleNovelController,
} from "../Controller/NovelController";

const AddNovel = {
  handler: AddNovelController,
};

const GetAllNovels = {
  handler: GetAllNovelsController,
};

const AddTags = {
  handler: AddTagsController,
};

const GetSingleNovel = {
  handler: GetSingleNovelController,
};

export { AddNovel, GetAllNovels, AddTags, GetSingleNovel };
