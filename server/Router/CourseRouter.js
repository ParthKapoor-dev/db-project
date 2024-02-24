const express = require("express");
const app = express.Router();
const { AddCourse, ListCourses, DisplayCourse } = require("../controller/Courses/CourseController");
const requireAuth = require("../middleware/Auth");
const multer=require("multer");

const upload = multer({ dest: 'uploads/' });

app.use(requireAuth);

app.post("/add-course",upload.single("videoFile"),AddCourse);
app.get("/list-course",ListCourses);
app.get('/display-course/:id' , DisplayCourse)

module.exports = app;