"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function connection() {
    let mongoAtring = process.env.MONGO_URI;
    try {
        let connect = await mongoose_1.default.connect(mongoAtring);
        console.log('connected to MongoDB');
    }
    catch (err) {
        console.log('Error Connecting to MongoDB: ', err);
    }
}
exports.default = connection;
