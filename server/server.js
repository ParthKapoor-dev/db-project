require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const AuthRouter=require("./Router/AuthRouter");
const CourseRouter=require("./Router/CourseRouter");
const bodyparser=require("body-parser");
const UserRoute=require("./Router/UserRoute");

app.use(cors())
app.use(bodyparser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'ON HOME PAGE' })
})

app.use("/auth",AuthRouter);
app.use("/courses",CourseRouter);
app.use("/users",UserRoute)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Connected to db and listening to port👻')
  })
}).catch(error => {
  console.log(error)
})