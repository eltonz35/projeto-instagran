import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post";
import { User } from "./user";






@Entity("comments")
export class Comment {
    @PrimaryColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    post_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    update_at: Date;
  
    @DeleteDateColumn()
    delete_at: Date;

    // Relations
    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: "post_id"})
    post: Post;

    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "user_id"})
    user: User
}