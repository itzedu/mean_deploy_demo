var path = require("path")
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./client")));
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/basic_mongoose");

var UserSchema = new mongoose.Schema({
  name: String,
  age: Number
})

var User = mongoose.model("User", UserSchema);

app.get("/", function(req,res) {
  User.find({}, function(err, results){
    if(err) {
      console.log("Error", err);
    } else {
      res.render("index", {users: results});
    }
  })
})

app.post("/create", function(req,res) {
  var user = new User(req.body);
  user.save(function(err, results){
    if(err) {
      console.log("Error", err);
    } else {
      res.redirect("/");
    }
  })
})


app.listen(8000, function() {
  console.log("cool stuff on: 8000");
})
