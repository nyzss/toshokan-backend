import "reflect-metadata";
import AuthRoute from "./routes/Main/Auth";
import fastify from "./application";
import UserRoute from "./routes/Main/User";
import PostRoute from "./routes/Main/Post";

import * as dotenv from "dotenv";
import connection from "./database";
dotenv.config();

const start = async () => {
  try {
    await connection();
    fastify.listen(process.env.PORT || 5000, () => {
      console.log("server running on http://localhost:5000");
    });
  } catch (error) {
    console.log(error);
  }
};

fastify.register(AuthRoute);
fastify.register(UserRoute);
fastify.register(PostRoute);

start();
