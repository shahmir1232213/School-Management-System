"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_1 = require("../controllers/studentController");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const studentRouter = express_1.default.Router();
studentRouter.post("/register", multerConfig_1.default.single("image"), studentController_1.register);
studentRouter.get("/fetch", studentController_1.fetch);
studentRouter.post("/feeStatusRenew", studentController_1.feeStatusRenew);
studentRouter.post("/feesPaid", studentController_1.feesPaid);
studentRouter.put("/:id", multerConfig_1.default.single("image"), studentController_1.update);
studentRouter.delete("/:id", studentController_1.remove);
exports.default = studentRouter;
