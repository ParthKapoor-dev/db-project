const express=require("express");
const app=express.Router();
const {SignUp,Login}=require("../controller/Auth/index");

app.body("/signin",SignUp);
app.body("/login",Login);