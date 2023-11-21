import { Request, Response } from "express";
import { AppDataSource } from "../database/app-data-source";
import { User } from "../entities/user";
import { Post } from "../entities/post";
import { Like } from "../entities/like";

class likeController {
    async likePost( req: Request, res: Response) {
        const { post_id } = req.params;

        try {
            const requestingUser = res.locals.user as User;
            
            const post = await AppDataSource.getRepository(Post).findOne({
                where: { id: +post_id},
            });

            if(!post) {
                return res.status(404).json({ ok: false, message: "Post not found"});
            }

            const existLike = await AppDataSource.getRepository(Like).findOne({
                where: { user_id: requestingUser.id, post_id: +post_id},
            });

            if(existLike) {
                return res.status(200).json({ ok: true, message: "Like already exists"});
            }

            const like = await AppDataSource.getRepository(Like).save({
                user_id: requestingUser.id,
                post_id: +post_id
            });

            return res.status(201).send({ ok: true, like})

        } catch (error) {
            console.log(error, "Error in likePost");
            return res.status(500).send({ ok: false, message: "error-creating-like"});
        }
    }

    async dislikePost( req: Request, res: Response) {
        const { post_id } = req.params;
        try {
            const requestingUser = res.locals.user as User;

            const post = await AppDataSource.getRepository(Post).findOne({
                where: { id: +post_id},
            });

            if(!post) {
                return res.status(404).json({ ok: false, error: "Post not found"});
            }

            const like = await AppDataSource.getRepository(Like).findOne({
                where: {user_id: requestingUser.id, post_id: +post_id},
            });

            if(!like) {
                return res.status(404).json({ ok: false, error: "Like is not found"});
            }

            await AppDataSource.getRepository(Like).softRemove(like);
            console.log(`Like ${like.id} deleted`);
            
            return res.status(200).json({ ok: true, message: "Disliked succesfully"});

        } catch (error) {
            console.log(error, "Error in dislikePost");
            return res.status(500).send({ ok: false, message: "error-dislike-post"})
        }
    }
}

export default new likeController();