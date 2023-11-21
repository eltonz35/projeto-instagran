import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Comment } from "./comments";
import { Like } from "./like";


@Entity("posts")
export class Post {
    @PrimaryColumn()
    id: number;

    @Column()
    image_url: string;

    @Column()
    label: string;

    @Column()
    user_id: number;       

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    update_at: Date;
  
    @DeleteDateColumn()
    delete_at: Date;

    // Relations
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: "user_id" })
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @OneToMany(() => Like, (like) => like.post)
    like: Like[]
}