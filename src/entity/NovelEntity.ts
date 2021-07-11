import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Languages, NovelTypes } from "../types/enums";
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

  @Column()
  coverUrl: string;

  @ManyToMany(
    () => Tags,
    (tags) => tags.novels
  )
  @JoinTable()
  tags: Tags[];
  // Tags as many to many because there are a lot of tags
  // and i dont have the willpower to add them manually

  @ManyToMany(
    () => User,
    (users) => users.list
  )
  @JoinTable()
  readers: User[];

  @Column({
    default: 0,
  })
  totalReader: number;

  @Column({
    type: "enum",
    enum: Languages,
  })
  languages: Languages;

  @Column({
    type: "enum",
    enum: NovelTypes,
  })
  type: NovelTypes;
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
