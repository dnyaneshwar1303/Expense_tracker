import { db } from "../Model/db.js";


export function addExpense(req,res){
    try{

        const{name,amount,date,description}=req.body;
        const user_id = req.user.id;

        if(!name||!amount||!date||!user_id||!description){
            return res.status(500).json({messsage:"all fields are required"});
        }

        // const token_id=Number(req.user.id);

        // if(token_id!==user_id){
        //     return res.status(401).json({message:"Unauthorized"})
        // }


        const addQuery=`insert into expense(name,amount,date,user_id,description) values(?,?,?,?,?)`;

        db.query(addQuery,[name,amount,date,user_id,description],(err,result)=>{
            if(err){
                return res.status(500).json({message:err.message});
            }

            return res.status(201).json({message:"expense added"});
        })

    }catch(err){
        return res.status(500).json({message:err.message});
    }
};



export function updateExpense(req,res){
    try{

        const{name,amount,date,description}=req.body;
        const{id}=req.params;

        const updateQuery=`update expense set name=?,amount=?,date=?,description=? where expense_id=?`;

        db.query(updateQuery,[name,amount,date,description,id],(err,result)=>{

            if(err){
                return res.status(500).json({message:err.message})
            }

            return res.status(200).json({message:"expense updated"});
            
        });


    }catch(err){
        return res.status(500).json({message:err.message});
    }
};


export function getExpense(req,res){
    try{
        const userId = req.user.id;

        const getExpenseQuery = `
          SELECT expense_id, name, amount, date, description
          FROM expense
          WHERE user_id = ?
        `;

        db.query(
          getExpenseQuery,
          [userId],
          (err,result)=>{
              if(err){
                  return res.status(500).json({
                    message: err.message
                  });
              }

              return res.status(200).json({
                  message:"expenses fetched",
                  expenses: result
              });
          }
        );

    } catch(err){
        return res.status(500).json({
          message: err.message
        });
    }
}
