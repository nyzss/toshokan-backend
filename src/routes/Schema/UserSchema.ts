import { CurrentUserController } from "../Controller/UserController";

const CurrentUser = {
  //   schema: {
  //     response: {
  //       200: {
  //         type: "object",
  //         properties: {
  //           username: {
  //             type: "string",
  //           },
  //           _id: {
  //             type: "string",
  //           },
  //           data: {
  //             type: "object",
  //             properties: {
  //               avatarUrl: { type: "string" },
  //               backgroundUrl: { type: "string" },
  //               about: { type: "string" },
  //               usergroup: { type: "string" },
  //               library: { type: "array" },
  //               posts: { type: "array" },
  //               createdAt: { type: "string" },
  //               updatedAt: { type: "string" },
  //             },
  //           },
  //         },
  //       },
  //     },
  //   },
  handler: CurrentUserController,
};

export { CurrentUser };
