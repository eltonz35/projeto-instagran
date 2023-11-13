import { Request, Response } from "express";
import { User } from "../entities/user";
import { AppDataSource } from "../database/app-data-source";
import bcrypt from "bcrypt";

class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password, bio} = req.body;

    try {
      const user = await AppDataSource.getRepository(User).save({
        name: name,
        email: email,
        password_hash: bcrypt.hashSync(password, 8),
        bio: bio
      });
      console.log(`User ${user.id} created`);
      res.status(201).json({ ok: true, message: "Usuário criado com sucesso"});
    } catch (error) {
      return res.status(400).json({ message: "Erro ao criar usuário"})
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const users = await AppDataSource.getRepository(User).find({
        select: ["id", "name", "bio", "followers_count", "following_count"],
      });
      return res.status(200).json({ ok: true, users});
    } catch (error) {
      return res.status(400).json({ message: "Erro ao listar usuários"});
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        select: ["id", "name", "bio", "followers_count", "following_count"],
        where: { id: +req.params.user_id},
      });
      return res.status(200).json({ ok: true, user})
    } catch (error) {
      console.log(error, "Erro in findOne");
      res.status(500).send({ ok: false, error: "error-findind-user"})
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { name, bio } = req.body;
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: +req.params.user_id },
      });

      if(!user) {
        return res.status(404).json({ ok: false, error: "user-not-found"});
      }

      if(name) user.name = name;
      if(bio) user.bio = bio;

      await AppDataSource.getRepository(User).save(user);
      console.log(`User ${user.id} updated`);

      return res.status(200).json({ ok: true, user})
    } catch (error) {
      console.log(error, "Error n updateUser");
      res.status(500).send({ ok: false, error: "error-updating-user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: { id: +req.params.user_id},
      });

      if(!user) {
        return res.status(404).json({ ok: false, error: "user-not-found"});
      }

      await AppDataSource.getRepository(User).softDelete(user);
      console.log(`User ${user.id} deleted`);

      return res.status(200).json({ ok:true, message: "Usuário deletado com sucesso"})
    } catch (error) {
      console.log(error, "Error in deleteUser");
      res.status(500).send({ ok: false, error: "error-deleting-user"})      
    }
  }
}

export default new UserController();