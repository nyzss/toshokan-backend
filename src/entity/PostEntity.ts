import { Entity, Column, ManyToOne } from "typeorm";
import { Model } from "./ModelEntity";
import { User } from "./UserEntity";

@Entity("posts")
export class Post extends Model {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(
    () => User,
    (users) => users.posts
  )
  user: User;
}
