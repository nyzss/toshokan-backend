import { Column, Entity, Index, ManyToMany, OneToMany } from "typeorm";
import { UserRole } from "../types/enums";
import { Model } from "./ModelEntity";
import { Novel } from "./NovelEntity";
import { Post } from "./PostEntity";

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

  @ManyToMany(
    () => Novel,
    (novels) => novels.readers
  )
  list: Novel[];

  toJSON() {
    return { ...this, passwordHash: undefined, email: undefined };
  }
}
