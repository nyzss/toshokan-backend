import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Model } from "./ModelEntity";
import { User } from "./UserEntity";

@Entity("novels")
export class Novel extends Model {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @ManyToMany(
    () => Tags,
    (tags) => tags.novels
  )
  @JoinTable()
  tags: Tags[];

  @ManyToMany(
    () => User,
    (users) => users.list
  )
  @JoinTable()
  readers: User[];
}

@Entity("tags")
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(
    () => Novel,
    (novels) => novels.tags
  )
  novels: Novel[];
}
