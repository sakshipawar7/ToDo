const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

var itemlists =[];

app.get("/", function (req, res) {
  const currentDay = date.getDate();
  res.render("list", {listTitle:currentDay, list:itemlists, pageTitle: "Home"})

});

app.post("/", function (req, res) {
  const newItem= req.body.inp;
      itemlists.push(newItem);
      res.redirect("/");   
})

app.post('/delete', function(req, res) {
  console.log(req.body);
  var index = req.body.index;
  itemlists.splice(index, 1); // Remove the corresponding paragraph from the array
  res.redirect('/'); // Redirect to the homepage
});

app.post("/update", function (req, res) {
  const index = req.body.index;
  const updatedText = req.body.updatedValue;
  itemlists[index] = updatedText; // Update the corresponding item in the list array
  res.redirect("/");
});


app.get("/about", function(req,res){
  res.render("about", {pageTitle: "About"});
})

app.post("/about", function(req,res){
  res.redirect("/");
})

app.get("/contact", function(req,res){
  const showDiv = false;
  res.render("contact", {pageTitle: "Contact Us", showDiv});
})

app.post("/contact", function(req,res){
  const showDiv = true;
  res.render("contact", {pageTitle: "Contact Us",showDiv})
    // redirect("/contact");
})

app.listen(process.env.PORT || 3000, function () {
  console.log("server started on port 3000");
});

