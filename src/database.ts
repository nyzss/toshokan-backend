import * as dotenv from "dotenv";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
dotenv.config();

const connection = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [User, Post],
  });
};

export default connection;
