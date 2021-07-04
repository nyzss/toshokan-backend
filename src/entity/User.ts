import { Entity, Column, OneToMany, Unique, Index } from "typeorm";
import { Model } from "./Model";
import { Post } from "./Post";

type UserRole = "admin" | "moderator" | "contributor" | "member";

@Entity("users")
export class User extends Model {
  @Index(["username"])
  @Column()
  username: string;

  @Column()
  passwordHash: string;

  @Column()
  email: string;

  @OneToMany(
    () => Post,
    (posts) => posts.user
  )
  posts: Post[];

  @Column({
    type: "enum",
    enum: ["admin", "moderator", "contributor", "member"],
    default: "member",
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
