import { Request, Response } from "express";
import { User } from "../entities/user";
import { AppDataSource } from "../database/app-data-source";
import { Post } from "../entities/post";
import { Comment } from "../entities/comments";

class CommentController {
    async createComment( req: Request, res: Response ) {
        try {
            const requestingUser = res.locals.user as User;
            const { post_id } = req.params;
            const { text } = req.body;

            const post = await AppDataSource.getRepository(Post).findOne({
                where: { id: +post_id },
            });

            if(!post) {
                return res.status(404).json({ ok: false, message: "Post not found" });
            }

            const newComment = new Comment();
            newComment.text = text;
            newComment.user = requestingUser;
            newComment.post = post;

            await AppDataSource.getRepository(Comment).save(newComment);

            return res.status(201).json({ ok: true, message: "Comentário criado com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ ok: false, error: "Erro ao criar comentário"});
        }
    }

    async listComments( req: Request, res: Response ) {
        try {
            const { post_id } = req.params;

            const comments = await AppDataSource.getRepository(Comment).find({
                where: { post_id: +post_id },
            });

            return res.status(200).json({ ok: true, comments });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ ok: false, error: "Erro ao listar comentários" });
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            const requestingUser = res.locals.user as User;
            const { comment_id } = req.params;

            const comment = await AppDataSource.getRepository(Comment).findOne({
                where: { id: +comment_id, user: requestingUser },
            });
             if(!comment) {
                return res.status(404).json({ ok: false, message: "Comment not found" });
             }

             await AppDataSource.getRepository(Comment).remove(comment);
             
             return res.status(200).json({ ok: true, message: "Comentário excluído com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ ok: false, error: "Erro ao excluir comentário"});
        }
    }
}

export default new CommentController();