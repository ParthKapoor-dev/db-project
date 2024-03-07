const express = require("express");
const app = express.Router();

const {AddSubgroup, AddStudent}= require("../controller/Users/UserController");

app.post("/add-subgroup",AddSubgroup);
app.post("/add-student",AddStudent);