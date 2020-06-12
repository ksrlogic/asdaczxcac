var express = require('express');
var router = express.Router();
var mongoose = require("mongoose")
const Schema = mongoose.Schema;

/* GET home page. */
var MyModel = mongoose.model('Users', new Schema({
  username: String,
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, trim: true },
  created_at: {type:Date, default:Date.now},
  }));


var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));


router.get('/', function(req, res, next) {
  res.render('index', { });
});

router.get('/login', function(req,res,next){
  res.render('login',{})
})

router.get('/register', function(req,res,next){
  res.render('register',{})
})

router.post('/register_process', function(req,res,next){
  if(req.body.password[0] != req.body.password[1]){
    res.send("잘못된경로입니다.")
  } else if (req.body.password[0].length < 8){
    res.send("잘못된 경로입니다.")
  }
  console.log(req.body)
  const {Username, email, password} = req.body
  var Usermodel = MyModel()
  Usermodel.email = email
  Usermodel.username = Username
  Usermodel.password = password[0]
  Usermodel.save()
  .then(res.redirect("/login"))
})

router.post('/login_process', function(req,res){
  console.log(req.body)
  const {email, password} = req.body
  console.log(email)
  MyModel.findOne({email : `${email}`}, function(err, user){
    if (err) throw err;
    if(user.password != password){
      res.redirect("/login")
    }else{
      
    }
  })
})


module.exports = router;
