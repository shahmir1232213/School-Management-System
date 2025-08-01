import multer, { StorageEngine } from "multer";
import crypto from "crypto";
import path from "path";
import { Request } from "express";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },
  filename: function (req: Request, file, cb) {
    crypto.randomBytes(12, (err, buffer) => {
      if (err) return cb(err, "");
      const filename = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

const upload = multer({ storage });

export default upload;
