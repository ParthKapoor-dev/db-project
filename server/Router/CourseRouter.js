const express = require("express");
const app = express.Router();
const { AddCourse, ListCourses, DisplayCourse } = require("../controller/Courses/CourseController");
const requireAuth = require("../middleware/Auth");

app.use(requireAuth);

app.post("/add-course",AddCourse);
app.get("/list-course",ListCourses);
app.get('/display-course/:id' , DisplayCourse)

module.exports = app;