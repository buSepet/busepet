const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000


const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
  host: "smtp.busepet.com",
  port: 465,
  secure: true,
  auth: {
    user: "bilgi@busepet.com",
    pass: ""
  }
});
var viewpath = __dirname + '/views/';

app.use("/css", express.static(__dirname + '/css'))
app.use("/fonts", express.static(__dirname + '/fonts'))
app.use("/images", express.static(__dirname + '/images'))
app.use("/images-slider", express.static(__dirname + '/images-slider'))
app.use("/js", express.static(__dirname + '/js'))
app.use("/rs-plugin", express.static(__dirname + '/rs-plugin'))

//ROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTESROUTES
app.get('/', (req, res) => res.send('Hello Detch , welcome to here !!'))
app.get("/index", function (req, res) {
  res.sendFile(viewpath + "/index-coming-soon.html");
});

//Email Sender Route
app.post('/sendEmail', function (req, res) {
  
  var mailOptions = {
    from:"bilgi@busepet.com",
    to: req.query.to,
    subject: req.query.subject,
    text: req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    // console.log(mailOptions.to);
    if (error) {
      console.log(error);
      res.end("error");
    } else {
      console.log("Message sent:");
      res.end("sent");
    }
  });
});
//Email Sender Route

app.listen(PORT, () => console.log('created!'))