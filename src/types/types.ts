import { Languages, NovelTypes, Status } from "./enums";

export interface TagBodyInterface {
  title: string;
  description: string;
  novelId: string;
}

export interface AddNovelBodyInterface {
  title: string;
  description: string;
  author: string;
  artist: string;
  coverUrl: string;
  language: Languages;
  type: NovelTypes;
  chapter: number;
  status: Status;
}

export interface IDInterface {
  id: string;
}

export interface UserAddReadingListInterface {
  id: string;
  novelId: string;
}

export interface RegisterInterface {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface AddPostInterface {
  title: string;
  content: string;
  id: string;
}
export interface NovelQueryInterface {
  limit: string | number;
  offset: string | number;
}

export interface TagNovelInterface {
  novelId: string;
  tagId: string;
}
