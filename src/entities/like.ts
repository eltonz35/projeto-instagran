import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity("likes")
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post_id: number

    @Column()
    user_id: number

    @Column()
    like: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    apdated_at: Date

    @DeleteDateColumn()
    deleted_at: Date

    //Relations
    @ManyToOne(() => User, (user) => user.like)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Post, (post) => post.like)
    @JoinColumn({ name: "post_id" })
    post: Post;
} 