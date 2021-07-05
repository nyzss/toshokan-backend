import { FastifyRequest } from "fastify";

export interface TagBody {
  body: {
    title: string;
    description: string;
    novelId: string;
  };
}

export interface AddNovelBody {
  body: {
    title: string;
    description: string;
    author: string;
  };
}

export interface SingleUser {
  id: string;
}

export interface UserAddReadingList {
  id: string;
  novelId: string;
}

export type RegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}>;

export type LoginRequest = FastifyRequest<{
  Body: {
    email: string;
    password: string;
  };
}>;
