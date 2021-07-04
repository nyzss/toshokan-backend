import {
  RegisterController,
  LoginController,
  LogoutController,
} from "../Controller/AuthController";

const AuthRegister = {
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
  handler: RegisterController,
};

const AuthLogin = {
  handler: LoginController,
};
const AuthLogout = {
  handler: LogoutController,
};
export { AuthRegister, AuthLogin, AuthLogout };
