const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const compression = require('compression');
const path = require('path');
const request = require('request');
const app = express();
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

const port = process.env.PORT || 3000;

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hello@tipigo.com',
    pass: 'sismatipigo1234'
  }
});

if (port == 3000){
  app.use(express.static('../views'));
} else {
  app.use(express.static('views'));
}

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res) =>{
	res.render('index.html');
});

app.post('/submit',function(req,res){

  var user = {
    name: req.body.name ,
    email: req.body.email ,
    phone: req.body.phone ,
    company: req.body.company ,
    text: req.body.message ,
    g_recaptcha_response: req.body.g_recaptcha_response,
  }

  var mailOptions = {
    from: 'hello@tipigo.com',
    to: 'elran@tipigo.com, nechemia@tipigo.com, support@tipigo.com',
    subject: 'New contact us from Tipigo.com',
    text: 'name :' + req.body.name + ' ,email: ' + req.body.email + ' ,phone: ' + req.body.phone + ' ,company: ' + req.body.company + ' ,message: ' + req.body.message, 
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  // app.post('https://www.google.com/recaptcha/api/siteverify?secret=6LftaYIUAAAAALC91xtYZuSuyDLMTN9jRdt8m1CD&response=' + user.g_recaptcha_response + '&remoteip=' + req.connection.remoteAddress, function(request,response){
  //   console.log("secret: " + request.secret);
  //   console.log("response: " + request.response);
  //   console.log("remoteip: " + request.remoteip);
  // });

  res.status(200).json({status:"ok"})
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});

module.exports = {app};