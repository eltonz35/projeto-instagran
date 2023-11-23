import { NextFunction, Request, Response } from "express";

export const validateCommentCreationMiddleware = async (req: Request, res: Response, next: Function) => {
    const { text } = req.body;

    if(!text) {
        return res.status(400).json({ ok: false, error: "Comment text is required" });
    }

    next();
}