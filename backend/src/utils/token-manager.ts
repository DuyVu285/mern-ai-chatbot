import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";
import { rejects } from "assert";
export const createToken = (id: string, email: string, expiresIn) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies[`${COOKIE_NAME}`];
  return new Promise<void>((resolve, rejects) => {
    return jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err, success) => {}
    );
  });
};
