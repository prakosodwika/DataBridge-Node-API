import { Request, Response, NextFunction } from "express";
import { response_bad_request } from "$utils/response.utils";
import { upload } from "$utils/file.utils";

export function uploadFile(
  req: Request, 
  res: Response, 
  next: NextFunction
): Response | void {
  upload.single("file")(req, res, (err) => {
    if (err instanceof Error) {
      return response_bad_request(res, err.message);
    }
    next();
  });
}