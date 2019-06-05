var express = require("express"); //Call Express
var app = express(); 
var bodyParser= require("body-parser"); //Call Body_parse
var mongoose = require("mongoose"); //Call Mongoose

app.use(bodyParser.urlencoded({extended:true})); //use body parser
app.set("view engine", "ejs"); //Set ejs as a default view engine

//db
mongoose.connect("mongodb://localhost/bike_app"); //Connect to database or create it

//db schema
var locationSchema = new mongoose.Schema({
    name: String,
    img: String,
    security: Number
})

//take the previous pattern and we put it into a model
var Location = mongoose.model("Location", locationSchema);

//Variables
  var places = [
            { name: "South Bank", image: "https://images.unsplash.com/photo-1532522593358-9e5e2a22f231?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2930&q=80"},
            { name: "Tower Bridge", image: "https://images.unsplash.com/photo-1522961881734-7df1e2635d0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"},
            { name: "Liverpool Street", image: "https://images.unsplash.com/photo-1508717765549-dee93e0044fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"}
    ];

//Landing Page
app.get("/", function(req,res){
    res.render("landing");
});

//List of places
app.get("/places", function(req,res){
    res.render("places", {places:places});
});

app.post("/places", function(req,res){
    
    //Logic
    //Get data from fields in the Post request
    var name = req.body.name;
    var image = req.body.image;
    //Create a new object with data
    var newPlace = {name:name, image:image};
    //Add data to our array
    places.push(newPlace);
    
    //Redirect to the places page
    res.redirect("/places");
    
    
});

//Form to add new place
app.get("/places/new", function(req, res) {
   res.render("new"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started... ")
}); 