import { Router } from "express";
import UserController from "../controllers/user";
import { validateUserCreationMiddleware } from "../middlewares/validate-user-creation.middleware";
//import { validateJwtUser } from "../../../common/middlewares/auth.middleware";


export const UserRoutes = () => {
    const router = Router();

      // POST /users
  router.post("/", validateUserCreationMiddleware, UserController.createUser);

  // GET /users
  router.get("/", UserController.listUsers);

  // GET /users/:user_id
  router.get("/by_id/:user_id", UserController.findOne);

  // PATCH /users/:user_id
  router.patch("/:user_id", UserController.updateUser);

  // DELETE /users/:user_id
  router.delete("/:user_id", UserController.deleteUser);

  // POST /users/authenticate
  //router.post("/authenticate", UserController.authenticate);

  // GET /users/posts
  //router.get("/posts", validateJwtUser, UserController.listPosts);

  // GET /users/:user_id/posts
  // router.get("/:user_id/posts", UserController.listPostsByUser);

  return router;
};