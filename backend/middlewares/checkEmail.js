import { pool } from "../db.js"

export const checkEmailValid = async(req,res,next)=>{
    const {email,role} = req.body;
    let result;
    try{
        result = await pool.query('select email from jobseekers where email=$1',[email]);
        if(result?.rowCount==0){
            result = await pool.query('select email from recruiters where email=$1',[email]);
        }
        if(result?.rowCount==0){
            next();
        }
        else{
            return res.json({success:false,message:"This email is already registered."});
        }
    }
    catch(err){
        console.log(err.message);
        return res.json({success:false,message:"Server error."});
    }
}

//can also include a middle ware to check cookie