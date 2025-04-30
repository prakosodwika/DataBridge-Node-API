import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { response_unauthorized } from "$utils/response.utils";
import Logger from "$pkg/logger"; 
import { UserJWTDAO } from "$entities/User";

// Extend Request untuk menyimpan data user dari token
declare module "express-serve-static-core" {
  interface Request {
    user?: UserJWTDAO;
  }
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response_unauthorized(res, "Token not found");
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as UserJWTDAO;
    req.user = decoded;
    next();
  } catch (err) {
    Logger.warn("AuthMiddleware.authentication", err);
    return response_unauthorized(res, "Invalid token");
  }
};
