var express        = require("express"),
    Campground     = require("../models/campground"),
    middlewareObj  = require("../middleware"),
        Comment    = require("../models/comment"),
         router    = express.Router();



//=================
// Campgroud Routes
//==================

//Index route
router.get("/campgrounds", function(req,res){
         Campground.find({}, function(err, allCamps){
             if(err){
                 console.log("error");
             } else{
                res.render("campgrounds/index",{campgrounds: allCamps});
             }

         });

});

//Create Route
router.post("/campgrounds", middlewareObj.isLoggedIn, (req, res)=>{
        var name = req.body.name;
        var image = req.body.image;
        var desc  = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newCampground = {name:name, image: image, description: desc, author: author};
        Campground.create(newCampground,function(err, newlyCreated){
            if(err){
                console.log("error");
            } else{
                req.flash("success", "sucessfully created new campground!");
                res.redirect("/campgrounds");
                }
        });
});
// new Route
router.get("/campgrounds/new",middlewareObj.isLoggedIn, function(req, res){
        res.render("campgrounds/new");
});


//show route
router.get("/campgrounds/:id", function(req, res) {
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err || !foundCampground){
            req.flash("error", "Campground not found");
            res.redirect("back")
            } else {
                console.log(foundCampground)
                res.render("campgrounds/show", {campground: foundCampground});
                 }
        });
});

//Edit campground
router.get("/campgrounds/:id/edit", middlewareObj.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id,(err, foundCamp)=>{
        if(err || !foundCamp){
            req.flash("error", "no campground found");
        } else {
                res.render("campgrounds/edit",{campground:foundCamp});
            }
    });
});
//Update campgroud
router.put("/campgrounds/:id", middlewareObj.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCamp)=>{
        if(err){
            req.flash("error", "you do not have permission to do that");
        } else{
            req.flash("success", "sucessfully edited campground!");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//delete campground route
router.delete("/campgrounds/:id", middlewareObj.checkCampgroundOwnership,(req, res)=>{
    Campground.findByIdAndRemove(req.params.id,(err, campgroundRemoved)=>{
        if(err){
            req.flash("error", "you do not have permission to do that");
        } Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            req.flash("success", "sucessfully deleted campground!");
        res.redirect("/campgrounds");
        })
    
    });
});
        
  
module.exports = router;