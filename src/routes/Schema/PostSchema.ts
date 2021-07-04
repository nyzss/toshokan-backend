import {
  AddPostController,
  PostGetController,
  PostGetAllController,
} from "../Controller/PostController";

const PostReturn = {
  // schema: {
  //   response: {
  //     200: {
  //       type: "object",
  //       properties: {
  //         title: { type: "string" },
  //         content: { type: "string" },
  //         user: {
  //           type: "object",
  //           properties: {
  //             id: { type: "string" },
  //             username: { type: "string" },
  //             createdAt: { type: "string" },
  //             updatedAt: { type: "string" },
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  handler: AddPostController,
};

const PostGet = {
  //   schema: {
  //     response: {
  //       200: {
  //         type: "array",
  //         items: [
  //           {
  //             title: { type: "string" },
  //             content: { type: "string" },
  //             user: {
  //               type: "object",
  //               properties: {
  //                 id: { type: "string" },
  //                 username: { type: "string" },
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   },
  handler: PostGetController,
};

const PostGetAll = {
  handler: PostGetAllController,
};

export { PostReturn, PostGet, PostGetAll };
