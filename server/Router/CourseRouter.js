const express=require("express");
const app=express.Router();
const {AddCourse,ListCourses,DisplayCourse}=require("../controller/Courses/CourseController");
const requireAuth=require("../controller/Auth/index");

app.use(requireAuth);

app.post("/add-course",AddCourse);
app.get("/list-course",ListCourses);
app.get("/display-course",DisplayCourse);

module.exports=app;