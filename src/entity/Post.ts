import { Entity, Column, ManyToOne } from "typeorm";
import { Model } from "./Model";
import { User } from "./User";

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
