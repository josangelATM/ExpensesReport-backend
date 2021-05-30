const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const LocalStrategy = require('passport-local');
const reportRoutes = require('./routes/Report')
const User = require('./models/User')
const cors = require('cors')
const userRoutes = require('./routes/User')

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config(); 
}

const dbPath = process.env.DB_CONNECTION || 'mongodb://localhost:27017/ExpensesReport'
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
    let message = 'Ha ocurrido un error en el servidor, intentalo más tarde'
    if(err.name == 'UserExistsError'){
        message = 'El nombre de usuario ya existe'
    }
    res.status(400).send(message)
})

 
const port = process.env.PORT || 3000

app.listen(port)