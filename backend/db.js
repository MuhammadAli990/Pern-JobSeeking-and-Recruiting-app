import pkg from 'pg';
import dotenv from 'dotenv'
dotenv.config();

const {Pool} = pkg;

export const pool = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port: process.env.DB_PORT
})

export const connectDb = async()=>{
    try{
        await pool.connect();
        console.log("Database connected.");
    }
    catch(err){
        console.log("Error connecting database ",err.message);
    }
} 