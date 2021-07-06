export interface TagBodyInterface {
  title: string;
  description: string;
  novelId: string;
}

export interface AddNovelBodyInterface {
  title: string;
  description: string;
  author: string;
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

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CONTRIBUTOR = "contributor",
  MEMBER = "member",
}

export interface NovelQueryInterface {
  limit: string | number;
  offset: string | number;
}
