const express = require("express");
const app = express.Router();

const { AddSubgroup, AddStudent } = require("../controller/Users/UserController");
const requireAuth = require("../middleware/Auth");

app.use(requireAuth);

app.post("/add-subgroup", AddSubgroup);
app.post("/add-student", AddStudent);

module.exports = app;
