import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { Post } from "./post";
import { Comment } from "./comments";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true})
  email: string;

  @Column({nullable: true})
  bio: string;

  @Column({ default: 0})
  followers_count: number;

  @Column({ default: 0})
  following_count: number;

  @Column({select: false})
  password_hash: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @DeleteDateColumn()
  delete_at: Date;


  // Relationns

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]
}
