const express=require("express");
const app=express.Router();
const {SignUp,Login}=require("../controller/Auth/index");

app.post("/signin",SignUp);
app.post("/login",Login);

module.exports={app};