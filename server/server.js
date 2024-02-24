require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const UserRouter=require("./Router/UserRouter");

app.use(cors())

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'ON HOME PAGE' })
})

app.use("/auth",UserRouter)

mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log('Connected to db and listening to port👻')
  })
}).catch(error => {
  console.log(error)
})