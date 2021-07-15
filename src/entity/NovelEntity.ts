import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Languages, NovelTypes, Status } from "../types/enums";
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

  @Column({
    nullable: true,
  })
  artist: string;

  @Column({
    nullable: true,
  })
  coverUrl: string;

  @Column({
    nullable: true,
  })
  chapter: number;

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

  @Column({
    nullable: true,
  })
  releaseYear: number;

  @Column({
    default: 0,
  })
  totalReader: number;

  @Column({
    type: "enum",
    enum: Languages,
  })
  language: Languages;

  @Column({
    type: "enum",
    enum: NovelTypes,
  })
  type: NovelTypes;
  @Column({
    type: "enum",
    enum: Status,
  })
  status: Status;
}

// Tags as many to many because there are a lot of tags
// and i dont have the willpower to add them manually
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
    (novels) => novels.tags,
    {
      onDelete: "CASCADE",
    }
  )
  novels: Novel[];
}
