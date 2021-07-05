import fastify, { FastifyInstance } from "fastify";
import fastifyCookie from "fastify-cookie";
import fastifyCors from "fastify-cors";
import fastifySwagger from "fastify-swagger";
import { Server, IncomingMessage, ServerResponse } from "http";

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({
  logger: true,
});

server.register(fastifyCors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

server.register(fastifyCookie);

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: "/docs",
});

export default server;
