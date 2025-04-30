import { response_unauthorized } from "$utils/response.utils";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "$utils/jsonwebtoken.utils";
import { UserJWTDAO } from "$entities/User";
import Logger from "$pkg/logger"; 

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
    req.user = verifyToken(token);
    next();
  } catch (err) {
    Logger.warn("AuthMiddleware.authentication", err);
    return response_unauthorized(res, "Invalid token");
  }
};
