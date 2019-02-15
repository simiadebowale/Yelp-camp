var express        = require("express"),
    Campground     = require("../models/campground"),
    Comment        = require("../models/comment"),
    middlewareObj  = require("../middleware"),
         router    = express.Router();

//================
// Comments Route
//================

//New Comments
router.get("/campgrounds/:id/comments/new",middlewareObj.isLoggedIn, function(req, res) {
            Campground.findById(req.params.id,function(err, campground){
                if(err){
                    console.log(err);
                } else {

                res.render("comments/new", {campground: campground})

                }
            })

});
// post Route for new comments

//Create comments
router.post("/campgrounds/:id/comments",middlewareObj.isLoggedIn, function(req, res){
        Campground.findById(req.params.id, function(err, campground) {
            if(err){
                console.log(err);
            } else {
                Comment.create(req.body.comment, function(err, comment){
                    if(err){
                        console.log(err);
                    } else {
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.username;
                        comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "sucessfully added review!");
                    res.redirect('/campgrounds/' + campground._id)
                    }
                })
                }
        })
});
//Edit comments route
router.get("/campgrounds/:id/comments/:comment_id/edit",middlewareObj.checkCommentOwnership,(req, res)=>{
    Campground.findById(req.params.id, (err,foundCamp)=>{
        if(err||!foundCamp){
            req.flash("error", "No campground found");
            return res.redirect("back");
        } 
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
            req.flash("error", "Comment not found");
            res.redirect("back")
      }     else    {
    res.render("comments/edit",{comment: foundComment, campground_id: req.params.id});
      }
    });
    });
});
//Update comment
router.put("/campgrounds/:id/comments/:comment_id", middlewareObj.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment,(err, updatedComments)=>{
        if(err){
            req.flash("error", "you do not have permission to do that");
            res.redirect("back");
        } else {
            req.flash("success", "successfully edited review");
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
});
//Delete comments route
router.delete("/campgrounds/:id/comments/:comment_id",middlewareObj.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
        if(err){
            req.flash("error", "you do not have permission to do that");
            res.redirect("back");
        } else {
            req.flash("success", "successfully deleted comment");
            res.redirect("/campgrounds/"+ req.params.id)
        }
    });
});



module.exports = router;