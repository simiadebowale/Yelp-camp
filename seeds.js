var mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment");
    
var data = [{
             name:"Bayshore campgrounds",
            image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description: "The sky View is absolutely gorgeous and you get to meet a lot of new people"
            } 
,           
            {
             name:"Ramblin Pines",
            image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:"Whether its a calm environment or just a simple place to blow off stream, Ramblin Pines is the place for you"
            },
            {
             name:"Cherry Hill Park",
            image: "https://images.unsplash.com/photo-1455763916899-e8b50eca9967?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description: "This is a perfect place for a lovely night time stroll or a weekend getaway!"
            },
            {
            name:"Skipper's Point Campground",
            image: "https://images.unsplash.com/photo-1534880606858-29b0e8a24e8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:"Rated the number #1 campground in the state, Heavens Gate provides a safe and calm environment for all campers"
            }          
]
    function seedDB(){
   Campground.remove({},function(err){
    // if(err){
    //     console.log(err)
    // } console.log("deleted all campgrounds");
    // data.forEach(function(seed){
    //     Campground.create(seed, function(err,campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //             console.log("added Campground");
    //             //Create Comment
    //             Comment.create({
    //                 text: "Rated the number #1 campground in the state",
    //                 author: "Sam"
    //             }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else{
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                 }
    //             });
    //         }
            
    //     });
    // });
   });
}

module.exports = seedDB;