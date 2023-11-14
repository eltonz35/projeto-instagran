import { Router } from "express";
import PostController from "../controllers/post";
import { validateJwtUser } from "../../src/common/middlewares/auth.middleware";

export const PostRoutes = (): Router => {
  const router = Router();

  // POST /posts
  router.post("/", validateJwtUser, PostController.createPost);

  // GET /posts
  router.get("/", PostController.listPosts);

  return router;
};