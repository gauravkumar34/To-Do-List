const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")
const app = express();

const items = ["Buy Food", "Cook Food", "Eat Food"];
const workitems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extented : true}));
app.use(express.static("public"));

app.get("/", function(req, res){

  const day = date.getDate();
  res.render("list", {listTitle : day, newListItems : items});

});

app.post("/", function(req, res){
  const item = req.body.newItem;
  if(req.body.list ==="Work"){
    workitems.push(item);
    res.redirect("/work");
  }
  else{
  items.push(item);
  res.redirect("/");
}
})

//work layout

app.get("/work", function(req, res){
  res.render("list", {listTitle : "Work List", newListItems : workitems});
})

app.post("/work", function(req, res){
  let item = req.body.newListItems;
  workitems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res){
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
