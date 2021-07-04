import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Novel, Tags } from "./entity/NovelEntity";
import { Post } from "./entity/PostEntity";
import { User } from "./entity/UserEntity";
dotenv.config();

const connection = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Post, Novel, Tags],
  });
};

export default connection;
