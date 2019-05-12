//Bring Dependencies
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //Initialize app with express
const port = process.env.PORT;
const passport = require('passport');
const path = require("path");
const cors = require("cors");

//Routes
const usersR = require('./routes/users');
const messageR = require('./routes/message');


//Link With Angular with public folder
//CORS MiddleWare
app.use(cors());
app.use(express.static(path.join(__dirname,'./public')));

//Middlewares
app.use(bodyParser.json());
app.get('/',(req,res,next)=>{
    res.send('Welcome');
}
);

//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//use Routes
app.use('/users',usersR);
app.use('/messages',messageR);

//chat

app.get('*', (req, res) => {
  //res.sendFile(path.resolve('public/index.html'));
});

module.exports=app;