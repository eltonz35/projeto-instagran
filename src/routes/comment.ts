import { Router } from "express";
import { validateJwtUser } from "../common/middlewares/auth.middleware";
import CommentController from "../controllers/comments";
import { validateCommentCreationMiddleware } from "../middlewares/validate-comment-creation.middleware";

export const CommentRoutes = (): Router => {
    const router = Router();

    //POST /comments
    router.post("/post_id", validateCommentCreationMiddleware, validateJwtUser, CommentController.createComment);

    //GET /comments
    router.get("/:post_id", CommentController.listComments);

    //DELETE /comments
    router.delete("/:comment_id", validateJwtUser, CommentController.deleteComment);

    return router;
};