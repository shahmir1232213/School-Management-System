"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeTableController_1 = require("../controllers/timeTableController");
const timeTableRouter = express_1.default.Router();
timeTableRouter.post("/register", timeTableController_1.register);
timeTableRouter.get("/fetch", timeTableController_1.fetch);
timeTableRouter.post("/class", timeTableController_1.deleteClass);
timeTableRouter.put("/:id", timeTableController_1.update);
exports.default = timeTableRouter;
