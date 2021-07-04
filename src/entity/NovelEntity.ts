import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from "typeorm";
import { Model } from "./ModelEntity";

@Entity("novels")
export class Novel extends Model {
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  author: string;

  @ManyToMany(() => Tags)
  @JoinTable()
  tags: Tags[];
}

@Entity("tags")
export class Tags extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
