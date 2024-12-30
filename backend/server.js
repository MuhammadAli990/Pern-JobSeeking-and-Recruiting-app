import express from 'express'
import { connectDb, pool } from './db.js'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cron from 'node-cron'
import { checkEmailValid } from './middlewares/checkEmail.js'
import {getCurrentDate} from './lib/TodayDate.js'
import { verifyUserCookie } from './lib/VerifyCookie.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

const app = express()
const port = 3000
dotenv.config()
connectDb()
app.use(express.json({limit:'50mb',extended:true})); //read body
const corsOptions = {
  origin: 'http://localhost:5173', //Only frontend url which can send and recieve cookies.
  credentials: true,
};
app.use(cors(corsOptions)); //cors
app.use(cookieParser()); // to read the cookies sent from frontend
const secret_key = "fsjadk3iy8eidh3 ryiosihrf8923riohero2394ur3492u409";

const flagDeadlinePassedJobs = async()=>{
  const currentDate = getCurrentDate();
  try{
    await pool.query("update jobad set isdeadlinepassed=true where deadline=$1",[currentDate]);
    console.log("Flagged deadline passed jobs.");
  }
  catch(err){
    console.log(err.message);
    console.log("Error flagging deadline passed jobs.");
  }
}
cron.schedule('0 0 * * *',async()=>{
  await flagDeadlinePassedJobs();
})

// api to register a user in the system:
app.post('/signUp', checkEmailValid, async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (role === "jobSeeker") {
      await pool.query("insert into jobseekers (username,email,password) values ($1,$2,$3)", [username, email, hashedPassword]);
    }
    else if (role === "recruiter") {
      await pool.query("insert into recruiters (username,email,password) values ($1,$2,$3)", [username, email, hashedPassword]);
    }
    return res.json({ success: true, message: "Account created successfully" });
  }
  catch (err) {
    return res.json({ success: false, message: "Server error." });
  }
})

// api to login the user to the system:
app.post('/logIn', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("select * from jobSeekers where email=$1", [email]);
    const result2 = await pool.query("select * from recruiters where email=$1", [email]);
    if(result.rowCount!==0){
      const isMatch = await bcrypt.compare(password, result.rows[0].password);
      if(isMatch){
        jwt.sign({ username: result.rows[0].username, email: result.rows[0].email, id: result.rows[0].id, jobRole: 'jobSeeker' }, secret_key, {}, (error, token) => {
          return res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
          }).json({ success: true, message: "Signed in." });
        })
      }
    }
    else if(result2.rowCount!=0){
      const isMatch2 = await bcrypt.compare(password, result2.rows[0].password);
      if(isMatch2){
        jwt.sign({ username: result2.rows[0].username, email: result2.rows[0].email,  id: result2.rows[0].id, jobRole: 'recruiter' }, secret_key, {}, (_, token) =>  {
          return res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
          }).json({ success: true, message: "Signed In." });
        })
      }
    }
    else{
      return res.json({success:false,message:"Invalid credentials."});
    }
  }
  catch(e){
    console.log(e.message);
    return res.json({ success: false, message: "Server error." })
  }
})

//api to verify cookie
app.get('/verifyCookie', async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret_key, {}, (err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    return res.json({ success: true, message: "Authenticated.", data: info });
  })
})

//api to logout a user:
app.get('/logout', async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.json({ success: true, message: "Logged out successfully" })
  }
  catch (err) {
    res.json({ success: false, message: err.message });
  }
})

//get user data:
app.get('/getUserData',async(req,res)=>{
  try{
    const { token } = req.cookies;
    jwt.verify(token, secret_key, {}, async(err, info) => {
      if (err) {
        return res.json({ success: false, message: "not authenticated." });
      }
      if(info.jobRole == 'recruiter'){
        const result = await pool.query('select * from recruiters where id=$1',[info.id]);
        if(result.rowCount!=0){
          delete result.rows[0].password;
        }
        return res.json({ success: true, message: "Authenticated(data returned).", data: result.rows[0] });
      }
      const result = await pool.query('select * from jobSeekers where id=$1',[info.id]);
      if(result.rowCount!=0){
        delete result.rows[0].password;
      }
      return res.json({ success: true, message: "Authenticated(data returned).", data: result.rows[0] });
    })
  }
  catch(err){
    return res.json({ success: false, message: "Server error." });
  }
})

//edit profile:
app.post('/editJobSeekerProfile',async(req,res)=>{
  const {token} = req.cookies;
  const {profile,username,bio,role,city,experience,skills,education} = req.body;
  try{
    jwt.verify(token, secret_key, {}, async(err, info) => {
      if (err) {
        return res.json({ success: false, message: "not authenticated." });
      }
      await pool.query('update jobSeekers SET profile = $1, username = $2, bio = $3, jobrole = $4, city = $5, experience = $6, skills = $7, education = $8 where id = $9;',[profile,username,bio,role,city,experience,skills,education,info.id]);
      return res.json({ success: true, message: "Changes Saved."});
    })
  }
  catch(err){
    console.log(err.message);
    return res.json({ success: false, message: "Server error."});
  }
})

app.post('/editRecruiterProfile',async(req,res)=>{
  const {token} = req.cookies;
  const {profile,username,bio,industry,headquarters,about} = req.body;
  try{
    jwt.verify(token, secret_key, {}, async(err, info) => {
      if (err) {
        return res.json({ success: false, message: "not authenticated." });
      }
      await pool.query('update recruiters SET profile = $1, username = $2, bio = $3, industry = $4, headquarters = $5, about = $6 where id = $7;',[profile,username,bio,industry,headquarters,about,info.id]);
      return res.json({ success: true, message: "Changes Saved."});
    })
  }
  catch(err){
    return res.json({ success: false, message: "Server error."});
  }
})

// api to post a job Ad:
app.post('/postJobAd',async(req,res)=>{
  const { token } = req.cookies;
  const {title,description,jobRole,jobType,minEdu,sallery,experience,location,skillsArray,skillsText,deadline,questions} = req.body;
  const postDate = getCurrentDate();
  const questionsArray = questions.map((ele,ind)=>ele.question);
  const dataTypesArray = questions.map((ele,ind)=>ele.dataType);
  
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      await pool.query("insert into jobAd (title,description,jobRole,jobtype,minEdu,salary,currency,salarytype,experience,location,requiredskills,aboutrequiredskills,deadline,postDate,recruiter_Id,questions,questionsdatatype) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17);",[title,description,jobRole,jobType,minEdu,sallery.amount,sallery.currency,sallery.salleryType,experience,location,skillsArray,skillsText,deadline,postDate,info.id,questionsArray,dataTypesArray]);
      return res.json({success:true,message:"Job Posted."})
    }
    catch(err){
      return res.json({success:false,message:"Server error."})
    }
  })
})

//api to get jobAd details by recruiter id:
app.get('/getJobAdsByRecruitersId',async(req,res)=>{
  const {id} = req.query;
  try{
    const result = await pool.query("select jobAd.id, jobAd.title, jobAd.jobtype, jobAd.jobrole, jobAd.minedu, jobAd.requiredskills, recruiters.profile, recruiters.username from jobAd join recruiters on jobAd.recruiter_Id = recruiters.id where jobAd.recruiter_Id = $1;",[id]);
      return res.json({success:true,data:result.rows,message:"Data fetched."});
  }
  catch(err){
    console.log(err.message);
    return res.json({success:false});
  }
})

//api to get featured jobAds (on home page):
app.get('/getFeaturedJobAds',async(req,res)=>{
  try{
    const result = await pool.query("select jobAd.id, jobAd.title, jobAd.jobtype, jobAd.jobrole, jobAd.minedu, jobAd.requiredskills, recruiters.profile, recruiters.username from jobAd join recruiters on jobAd.recruiter_Id = recruiters.id where jobad.isdeadlinepassed=false limit 3");
    return res.json({success:true,data:result.rows,message:"Data fetched."});
  }
  catch(err){
    return res.json({success:false,message:"Server error."})
  }
})

//api to get a job ad by its id(pk)
app.post('/getJobAdByJobId',async(req,res)=>{
  const {id} = req.body;
  const {token} = req.cookies;
  try{
    const result = await pool.query("select jobAd.*, recruiters.profile, recruiters.username, recruiters.id as recruiter_id from jobAd join recruiters on jobAd.recruiter_Id = recruiters.id where jobAd.id = $1;",[id])
    if(result.rows[0].isdeadlinepassed==false){ 
      return res.json({success:true,data:result.rows,message:"Data fetched."});
    }
    // otherwise we check if the person checking the jobad is the recruiter of that jobad 
    else{
      const userCookieInfo = await verifyUserCookie(token);
      if(userCookieInfo==null){
        return res.json({success:false,message:"Deadline has passed for this job ad."});
      }
      else if(userCookieInfo.jobRole=="recruiter" && userCookieInfo.id==result.rows[0].recruiter_id){
        return res.json({success:true,data:result.rows,message:"Data fetched."});
      }
      return res.json({success:false,message:"Deadline has passed for this job ad."});
    }
  }
  catch(e){
    return res.json({success:false,message:"Server error."})
  }
})

//api to apply for a job (job applications):
app.post('/applyForJob',async(req,res)=>{
  const {token} = req.cookies;
  const {jobAdId,recruiterId,answers} = req.body;
  const submitDate = getCurrentDate();
  const response = "pending";

  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      await pool.query("insert into jobapplication (jobseeker_id,jobad_id,recruiter_id,answers,submitdate,response) values ($1,$2,$3,$4,$5,$6);",[info.id,jobAdId,recruiterId,answers,submitDate,response]);
      return res.json({success:true,message:"Job application submitted."})
    }
    catch(err){
      console.log(err.message);
      return res.json({success:false,message:"Server error."})
    }
  })

})

//api to check whether user has applied for a job or not:
app.post('/checkJobAppliedOrNot',async(req,res)=>{
  const {token} = req.cookies;
  const {jobAdId} = req.body;
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "Login to apply." });
    }
    try{
      const result = await pool.query("select * from jobapplication where jobseeker_id=$1 and jobad_id=$2",[info.id,jobAdId]);
      if(result.rows.length>0){
        return res.json({success:false,message:"You have already applied."})
      }
      return res.json({success:true,message:"Can apply for this job."});
    }
    catch(err){
      return res.json({success:false,message:"Server error."})
    }
  })
})

//api to get jobApplications by jobseeker id:
app.get('/getJobApplicationsByJobSeeker',async(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      const result = await pool.query("select jobapplication.response,recruiters.profile,recruiters.username,jobad.title,jobad.deadline from jobapplication join recruiters on jobapplication.recruiter_id=recruiters.id join jobad on jobapplication.jobad_id=jobad.id where jobseeker_id=$1 ORDER BY jobapplication.submitdate DESC",[info.id]);
      return res.json({success:true,message:"Data returned",data:result.rows});
    }
    catch(err){
      return res.json({success:false,message:"Server error."})
    }
  })
})

//api to get jobApplications by recruiter id:
app.get('/getJobApplicationsByRecruiter',async(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      const result = await pool.query("select jobapplication.response,jobapplication.id,jobapplication.submitdate,jobseekers.profile,jobseekers.username,jobad.title from jobapplication join jobad on jobapplication.jobad_id=jobad.id join jobseekers on jobapplication.jobseeker_id=jobseekers.id where jobapplication.recruiter_id=$1 ORDER BY jobapplication.submitdate DESC",[info.id]);
      return res.json({success:true,message:"Data returned",data:result.rows});
    }
    catch(err){
      console.log(err.message);
      return res.json({success:false,message:"Server error."})
    }
  })
})

// api to get job application by id:
app.post('/getJobApplicationById',async(req,res)=>{
  const {id} = req.body;
  const {token} = req.cookies;
  try{
    //also make sure the application can only be viewed by recruiter who got the application
    const result = await pool.query("select jobapplication.*,jobSeekers.city,jobseekers.email,jobseekers.education,jobseekers.skills,jobseekers.experience,jobseekers.username,jobseekers.jobrole,jobseekers.bio,jobAd.questions from jobapplication join jobseekers on jobapplication.jobseeker_id=jobseekers.id join jobad on jobApplication.jobad_id = jobad.id where jobapplication.id = $1;",[id]);
    delete result.rows[0].password;
    const userCookieInfo = await verifyUserCookie(token);
    if(userCookieInfo==null){
      return res.json({success:false,message:"You cannot view this job application."});
    }
    else if(userCookieInfo.jobRole=="recruiter" && userCookieInfo.id==result.rows[0].recruiter_id){
      return res.json({success:true,data:result.rows[0],message:"Data fetched."});
    }
    return res.json({success:false,message:"You cannot view this job application."});
  }
  catch(err){
    return res.json({success:false});
  }
})

// api to accept the job application:
app.post('/acceptJobApplication',async(req,res)=>{
  const {token} = req.cookies;
  const {id,interviewDate,interviewTime,location,message} = req.body;
  const loc = location.city+","+location.loc;
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      await pool.query("update jobapplication set response=$1 where id=$2",["accepted",id]);
      await pool.query("insert into acceptedapplication (interviewdate,interviewtime,location,message,jobapplication_id) values($1,$2,$3,$4,$5);",[interviewDate,interviewTime,loc,message,id]);
      return res.json({message:"Application accepted. Notification has been sent to the applicant.",success:true})
    }
    catch(err){
      return res.json({message:"Server error.",success:false})
    }
  })
})

//api to reject job application:
app.patch('/rejectJobApplication',async(req,res)=>{
  const {id} = req.body;
  try{
    await pool.query("update jobapplication set response = $1 where id=$2",["rejected",id]);
    return res.json({success:true,message:"Job application rejected."})
  }
  catch(err){
    return res.json({success:false,message:"Server error."})
  }
})

// api to get notifications:
app.get('/getNotifications',async(req,res)=>{
  const {token} = req.cookies;
  jwt.verify(token, secret_key, {}, async(err, info) => {
    if (err) {
      return res.json({ success: false, message: "not authenticated." });
    }
    try{
      // as this is inner join, so no pending or rejected job will appear
      const result = await pool.query("select acceptedapplication.*,jobad.title from jobapplication join acceptedapplication on jobapplication.id=acceptedapplication.jobapplication_id join jobad on jobad.id=jobapplication.jobad_id where jobseeker_id=$1",[info.id]);
      return res.json({success:true,data:result.rows});
    }
    catch(err){
      console.log(err.message);
      return res.json({success:false});
    }
  })
})

// api to get search results:
app.get('/search',async(req,res)=>{
  let {searchText} = req.query;
  searchText = searchText.toLowerCase();
  try{
    const jobs = await pool.query("select jobad.*,recruiters.username from jobad join recruiters on jobad.recruiter_id=recruiters.id where jobad.title ilike $1 and jobad.isdeadlinepassed=false",[`%${searchText}%`]);
    const jobSeekers = await pool.query("select * from jobseekers where username ilike $1",[`%${searchText}%`]);
    delete jobSeekers.password;
    const recruiters = await pool.query("select * from recruiters where username ilike $1",[`%${searchText}%`]);
    delete recruiters.password;
    return res.json({success:true,jobs:jobs.rows,jobSeekers:jobSeekers.rows,recruiters:recruiters.rows});
  }
  catch(err){
    console.log(err.message);
    return res.json({success:false});
  }
})

//api to get recruiter profile by its id
app.get('/getProfileByRecruiterId',async(req,res)=>{
  const {id} = req.query;
  try{
    const result = await pool.query("select * from recruiters where id=$1",[id]);
    delete result.rows[0].password;
    return res.json({success:true,data:result.rows[0]});
  }
  catch(err){
    return res.json({success:false});
  }
})
//api to get jobseeker profile by its id
app.get('/getProfileByJobseekerId',async(req,res)=>{
  const {id} = req.query;
  try{
    const result = await pool.query("select * from jobseekers where id=$1",[id]);
    delete result.rows[0].password;
    return res.json({success:true,data:result.rows[0]});
  }
  catch(err){
    console.log(err.message);
    return res.json({success:false});
  }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
