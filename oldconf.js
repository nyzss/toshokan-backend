const dotenv = require("dotenv");
dotenv.config();

const config = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  // entities: ["src/entity/**/*.ts"],
  // migrations: ["src/migration/**/*.ts"],
  // subscribers: ["src/subscriber/**/*.ts"],
  // cli: {
  //   entitiesDir: "src/entity",
  //   migrationsDir: "src/migration",
  //   subscribersDir: "src/subscriber",
  // },
  entities: ["dist/entity/**/*.js"],
  migrations: ["dist/migration/**/*.js"],
  subscribers: ["dist/subscriber/**/*.js"],
  cli: {
    entitiesDir: "dist/entity",
    migrationsDir: "dist/migration",
    subscribersDir: "dist/subscriber",
  },
};

module.exports = config;
