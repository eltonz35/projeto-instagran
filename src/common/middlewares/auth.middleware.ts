import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../database/app-data-source";
import { User } from "../../entities/user";

export async function validateJwtUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Busca o token no cabeçalho authorization
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verifica se o token é válido
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    const { id } = jwtPayload;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error, "error on validateJwtUser");
    return res.status(401).json({ message: "not-possible-to-authenticate" });
  }
}