var express = require("express"); //Call Express
var app = express(); 
var bodyParser= require("body-parser"); //Call Body_parse
//var model = require("./model.js");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs"); //Set ejs as a default view engine

// MODEL

var mongoose = require("mongoose"); //Call Mongoose

//helpers
var img1="https://images.unsplash.com/photo-1482222728531-f17c41146dd6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2657&q=80";
var img2="https://images.unsplash.com/photo-1466201276674-c06f9bf24323?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80";
var img3="https://images.unsplash.com/photo-1519109369405-acc801b7cf80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80";

//db
mongoose.connect("mongodb://localhost/bike_app", { useNewUrlParser: true }); //Connect to database or create it

//db schema
var locationSchema = new mongoose.Schema({
    name: String,
    type: String,
    spaces: Number,
    geo:{
        latitude: Number,
        longitude: Number,
    },
    image: String,
    cctv: Boolean,
    security: Number
});

//take the previous pattern and we put it into a model
var Location = mongoose.model("Location", locationSchema);

//Adding a new location
function addLocation(name,image) {

    var newLocation = new Location({
        //Generate name
        name: name,
        type: "other",
        spaces: 6,
        geo: {latitude: 0, longitude: 0},
        image: image,
        cctv: false,
        security: 0
    });
    
    newLocation.save(function(err,location){
        if(err){
            console.log("Error adding item to db");
        }else{
            console.log("New location added: " + location);
        }
    });
}

////////


//Landing Page
app.get("/", function(req,res){
    res.render("landing");
});

//INDEX
app.get("/locations", function(req,res){
    
    Location.find({}, function(err,locations){
        if(err){
            console.log("Unexpected error: " + err);
        }else{
            console.log("Retreiving locations...");
            res.render("locations", {locations:locations});
        }
    });
});

//CREATE 
app.post("/locations", function(req,res){
    
    //Logic
    //Get data from fields in the Post request
    var name = req.body.name;
    var image = req.body.image;
    //Create a new object with data
    //Add to database
    addLocation(name,image);
    //Redirect to the locations page
    res.redirect("/locations");
    
});

//NEW - Form to add new campground (must be before show route)
app.get("/locations/new", function(req, res) {
   res.render("new"); 
});

//SHOW
app.get("locations/:id", function(req, res) {
    res.send("Future show route");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started... ");
}); 

//Other Functions

//Create name

