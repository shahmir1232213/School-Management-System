"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../../public/images"));
    },
    filename: function (req, file, cb) {
        crypto_1.default.randomBytes(12, (err, buffer) => {
            if (err)
                return cb(err, "");
            const filename = buffer.toString("hex") + path_1.default.extname(file.originalname);
            cb(null, filename);
        });
    },
});
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
