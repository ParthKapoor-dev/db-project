const express=require("express");
const app=express.Router();
const {AddCourse,ListCourses}=require("../controller/Courses/CourseController");

app.post("/add-course",AddCourse);
app.get("/list-course",ListCourses);

module.exports=app;