"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teacherController_1 = require("../controllers/teacherController");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const teacherRouter = express_1.default.Router();
teacherRouter.post("/register", multerConfig_1.default.single("image"), teacherController_1.register);
teacherRouter.get("/fetch", teacherController_1.fetch);
teacherRouter.put("/:id", multerConfig_1.default.single("image"), teacherController_1.update);
teacherRouter.delete("/:id", teacherController_1.remove);
exports.default = teacherRouter;
