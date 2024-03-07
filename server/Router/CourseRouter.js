const express = require("express");
const app = express.Router();
const { AddCourse, ListCourses, DisplayCourse, getUserCourses , AddCourseVideo , AddSubgroup } = require("../controller/Courses/CourseController");

const requireAuth = require("../middleware/Auth");
const multer=require("multer");

const upload = multer({ dest: 'uploads/' });

app.use(requireAuth);

app.post("/add-course",AddCourse);
app.get("/list-course", ListCourses);

app.get('/display-course/:id', DisplayCourse);
app.get('/my-courses', getUserCourses)
app.post("/course-video",upload.single("videoFile"), AddCourseVideo)

module.exports = app;