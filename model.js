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
function addLocation(type,spaces,image,cctv) {

    var newLocation = new Location({
        //Generate name
        name: createName(type,spaces),
        type: type,
        spaces: spaces,
        geo: {latitude: 0, longitude: 0},
        image: image,
        cctv: cctv,
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

//Retreiving all locations
function getLocations() {
    
    Location.find({}, function(err,locations){
        if(err){
            console.log("Unexpected error: " + err);
        }else{
            console.log("Retreiving locations...");
        }
    });
}

//Other Functions

//Create name
function createName(type,spaces) {
    var size;
    
    if(spaces<=4){
        size = "Small ";
    }else if(spaces>=5 && spaces<=10){
        size= "Medium ";
    }else{
        size= "Large ";
    }
    
    return(size + type + " at London");
}

addLocation("deck", 20, img1, false);
addLocation("wall hoop", 1, img3, false);
addLocation("sheffield", 8, img2, true);



