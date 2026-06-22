import express from "express";
import { register, fetch, promote, update, remove } from "../controllers/classController";

const classRouter = express.Router();

classRouter.post("/register", register);
classRouter.get("/fetch", fetch);
classRouter.post("/promote", promote);
classRouter.put("/:id", update);
classRouter.delete("/:id", remove);

export default classRouter;
