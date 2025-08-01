import app from "./app";
import dotenv from 'dotenv';
import connection from './config/db'

// load .env into process.env
dotenv.config()

connection()
const PORT =  process.env.PORT;

app.listen(PORT,()=>{
    console.log('server started')
})