import express from "express";
import { login, logout, verifySession } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/verify", verifySession);
authRouter.post("/logout", logout);

export default authRouter;
