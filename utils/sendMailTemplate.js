const emailconfig = require('../config/emailConfig');

let nodemailer = require("nodemailer");
const express = require('express')
const ejs = require("ejs");

const router = express.Router()

let transporter = nodemailer.createTransport({
   service:'gmail',
//    host:emailconfig.host,
//    port:emailconfig.port,
   //iSsecure:emailconfig.iSsecure
   
    // auth: {
    //    user: emailconfig.username,
    //    pass: emailconfig.password
    // }
    auth: {
        user: 'sj11031996@gmail.com',
        pass: 'Suman123@'
     }
});

 
router.post('/send', (req, res, next) => {
    
    // const name = 'suman'
    const email = req.body.tomail
    // const message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, iste, amet consequatur a veniam.'
    console.log(email)
    const info ={
        name:req.body.name,
        message:req.body.message
    }
    ejs.renderFile(__dirname + "/templates/verify.ejs",info, function (err, data) {
      if (err) {
          console.log(err);
      } else {
          const mainOptions = {
              from: '"Suman Jana" noreply@shopit.com',
              to: email,
              subject: 'Account Activated',
              attachments:[
                {
                    name:'hello.txt',
                    path:'../backend/files/hello.txt'
                }
              ],
              html: data
          };
          //console.log("html data ======================>", mainOptions.html);
  
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                console.log(err)
              res.json({
                msg: 'fail'
              })
            } else {
              res.json({
                msg: 'success'
              })
            }
        });
        }
    });
  
  })
 
module.exports = router