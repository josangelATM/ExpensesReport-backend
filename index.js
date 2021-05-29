const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local');
const reportRoutes = require('./routes/Report')
const User = require('./models/User')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/User')
require('dotenv').config()
 

const dbPath = process.env.DB_CONNECTION || 'mongodb://localhost:27017/ExpensesReport'
console.log(dbPath)
const options = { useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false}
const mongo = mongoose.connect(dbPath, options);

mongo.then(() => {
    console.log('DB Connected');
}, err => {
    console.log(err);
})

//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
app.use('/users', userRoutes)
app.use('/reports',reportRoutes)


app.use((err, req, res, next) => {
  console.log(err)
  res.status(400).send(err)
})

 
const port = process.env.port || 3000

app.listen(port)