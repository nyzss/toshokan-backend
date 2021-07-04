import { Entity, Column, OneToMany, Index } from "typeorm";
import { Model } from "./ModelEntity";
import { Post } from "./PostEntity";

enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  CONTRIBUTOR = "contributor",
  MEMBER = "member",
}

@Entity("users")
export class User extends Model {
  @Index(["username"])
  @Column({
    length: 30,
    unique: true,
  })
  username: string;

  @Column()
  passwordHash: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @OneToMany(
    () => Post,
    (posts) => posts.user
  )
  posts: Post[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

  @Column({
    default: "Write something about youself!",
  })
  about: string;

  toJSON() {
    return { ...this, passwordHash: undefined, email: undefined };
  }
}
