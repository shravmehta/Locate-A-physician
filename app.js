var express = require('express');
var app = express();
var path = require('path')


var db_phy = require('./models/dbscript.js')
var bodyParser = require('body-parser');
var urlencodedParser = require('urlencoded-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '/resources')));
app.set('view engine', 'ejs');

app.set('views','views');
app.set('view engine', 'ejs');


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/dbphysicians',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
   console.log("We are connected!");
});

app.get('/', async function(req, res, next){

      res.render('index');
});

app.post('/map', async function(req,res,next){
  console.log(req.body.fname);
  console.log(req.body.mname);
  console.log(req.body.lname);
  var get_location = await db_phy.getUser(req.body.fname, req.body.mname, req.body.lname);
  if(!get_location){
  res.render('index',{error:"Incorrect Name or Format. Please try again."});
  }
  console.log(get_location);
  res.render('index',{fname: get_location.Physician_First_Name, mname: get_location.Physician_Middle_Name,lname: get_location.Physician_Last_Name,street: get_location.Recipient_Primary_Business_Street_Address_Line1,zip:get_location.Recipient_Zip_Code});
});

app.listen(7777);
