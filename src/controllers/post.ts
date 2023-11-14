import { Request, Response } from "express";
import { AppDataSource } from "../database/app-data-source";
import { Post } from "../entities/post";
import { User } from "../entities/user";

class PostController {
  async createPost(req: Request, res: Response) {
    try {
      const requestingUser = res.locals.user as User;

      const { label, image_url } = req.body;
      const post = await AppDataSource.getRepository(Post).save({
        label: label,
        image_url: image_url,
        user_id: requestingUser.id,
      });

      return res.status(201).send({ ok: true, post });
    } catch (error) {
      console.log(error, "Error in createPost");
      return res.status(500).send({ ok: false, error: "error-creating-post" });
    }
  }

  async listPosts(req: Request, res: Response) {
    try {
      const posts = await AppDataSource.getRepository(Post).find({
        relations: ["user"],
      });

      return res.status(200).send({ ok: true, posts });
    } catch (error) {
      console.log(error, "Error in listPosts");
      return res.status(500).send({ ok: false, error: "error-listing-posts" });
    }
  }
}

export default new PostController();