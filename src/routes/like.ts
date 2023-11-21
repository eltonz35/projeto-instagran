import { Router } from "express";
import { validateJwtUser } from "../common/middlewares/auth.middleware";
import LikeController from "../controllers/like";

export const LikeRoutes = (): Router => {
    const router = Router();

    //Post /like
    router.post("like/:post_id", validateJwtUser, LikeController.likePost);

    //Delete /like
    router.delete("dislike/:post_id", validateJwtUser, LikeController.dislikePost);

    return router;

};