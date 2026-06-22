"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectController_1 = require("../controllers/subjectController");
const subjectRouter = express_1.default.Router();
subjectRouter.post("/register", subjectController_1.register);
subjectRouter.get("/fetch", subjectController_1.fetch);
subjectRouter.put("/:id", subjectController_1.update);
subjectRouter.delete("/:id", subjectController_1.remove);
exports.default = subjectRouter;
