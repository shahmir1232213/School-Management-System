"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// load .env into process.env
dotenv_1.default.config();
(0, db_1.default)();
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log('server started: ', PORT);
});
