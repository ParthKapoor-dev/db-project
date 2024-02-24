const express=require("express");
const app=express.Router();
const {SignUp,Login}=require("../controller/Auth/index");

app.post("/signup",SignUp);
app.post("/login",Login);

module.exports=app;