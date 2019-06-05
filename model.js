var mongoose = require("mongoose"); //Call Mongoose

//db
mongoose.connect("mongodb://localhost/bike_app", { useNewUrlParser: true }); //Connect to database or create it

//db schema
var locationSchema = new mongoose.Schema({
    name: String,
    img: String,
    security: Number
});

//take the previous pattern and we put it into a model
var Location = mongoose.model("Location", locationSchema);

//Adding a new location
var newLocation = new Location({
    name: "Tower Bridge",
    img: "https://images.unsplash.com/photo-1522961881734-7df1e2635d0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    security: 5
});

newLocation.save(function(err,location){
    if(err){
        console.log("Error adding item to dd");
    }else{
        console.log("New location added: " + location);
    }
});

