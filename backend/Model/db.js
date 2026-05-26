import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

export const db=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
});

db.connect((err)=>{
    if(err){
        console.log("db connection failed");
    }
    else{
        console.log("DB connected");
    }
})
