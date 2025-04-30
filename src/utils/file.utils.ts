import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "");
    const fileName = `${timestamp}-${file.originalname}`;

    cb(null, fileName);
  }
});

// Middleware upload dengan konfigurasi storage di atas
export const upload = multer({ 
  storage, 
  fileFilter: (req: Request, file: Express.Multer.File, cb: any) => {
    const allowedMimes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new Error('Only Excel files are allowed'), false);
  },
});