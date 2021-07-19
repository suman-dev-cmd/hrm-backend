const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const errorMiddleware = require('./middlewares/errors');
dotenv.config({path:'config/config.env'});
const ejs = require("ejs");

app.use(express.json());
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use(cors());
app.use(fileUpload());

app.set('view engine', 'ejs');
//Import all route
const auth = require('./routes/auth');
const email = require('./utils/sendMailTemplate');
app.use('/api/v1',auth);
app.use('/api/v1',email);
app.get('/show',function(req,res){
    res.render('test');
  });
app.use(errorMiddleware);

module.exports = app;