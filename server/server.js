require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const AuthRouter = require("./Router/AuthRouter");
const CourseRouter = require("./Router/CourseRouter");
const userRouter = require('./Router/UserRoute');
const bodyparser = require("body-parser");


app.use(cors())
app.use(bodyparser.json());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'ON HOME PAGE' })
})

app.use("/auth", AuthRouter);
app.use("/courses", CourseRouter);
app.use('/user', userRouter);

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Connected to db and listening to port👻')
  })
}).catch(error => {
  console.log(error)
})