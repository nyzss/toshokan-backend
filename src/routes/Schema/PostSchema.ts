import {
  AddPostController,
  PostGetController,
  PostGetAllController,
} from "../Controller/PostController";

const PostReturn = {
  handler: AddPostController,
};

const PostGet = {
  handler: PostGetController,
};

const PostGetAll = {
  handler: PostGetAllController,
};

export { PostReturn, PostGet, PostGetAll };
