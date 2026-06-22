"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const classController_1 = require("../controllers/classController");
const classRouter = express_1.default.Router();
classRouter.post("/register", classController_1.register);
classRouter.get("/fetch", classController_1.fetch);
classRouter.post("/promote", classController_1.promote);
classRouter.put("/:id", classController_1.update);
classRouter.delete("/:id", classController_1.remove);
exports.default = classRouter;
