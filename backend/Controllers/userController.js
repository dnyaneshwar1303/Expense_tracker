import { db } from "../Model/db.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function addUser(req,res){
    try{
        const{username, fullName,email,password}=req.body;

        if(!username||!fullName||!email||!password){
            return res.status(400).json({message:"all fields are required"});
        }

        const checkUser=`select * from user where email=?`;
        db.query(checkUser,[email],async(err,result)=>{

            if(err){
                return res.status(500).json({message:err.message});
            }

            if(result.length>0){
                return res.status(400).json({message:"user already exist with this email"});
            }
            
            const hassPass=await bcrypt.hash(password,10);

            const adduser=`insert into user(username,fullName,email,password) values(?,?,?,?)`;

            db.query(adduser,[username,fullName,email,hassPass],(err,result)=>{

                if(err){
                    return res.status(500).json({message:err.message});
                }

                return res.status(201).json({message:"registration success"});
            });
        });

    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


export function login(req,res){
    try{
        const{username,password}=req.body;

        if(!username||!password){
            return res.status(400).json({message:"all fields are required"});
        };

        const finduser=`select * from user where username=?`;

        db.query(finduser,[username],async(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }

            if(result.length===0){
                return res.status(400).json({message:"user not register with this username"});
            };

            const user=result[0];

            const checkPass=await bcrypt.compare(password,user.password);
            if(!checkPass){
                return res.status(400).json({message:"wrong password"});
            }

            const token=jwt.sign({id:user.user_id,email:user.email},process.env.secretkey);

            return res.status(200).json({
                message:"login success",
                token:token,
                user_id: user.user_id
            });
        })

    }catch(err){
        return res.status(500).json({message:err.message});
    }
}