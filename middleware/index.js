var Campground  = require("../models/campground"),
        Comment = require("../models/comment");
        
var middlewareObj = {};
//All middleware

//check for user Authorization middleware


middlewareObj.checkCampgroundOwnership = function(req, res, next){
  if(req.isAuthenticated()){
      Campground.findById(req.params.id, function(err, foundCamp){
          if(err || !foundCamp){
              req.flash("error", "Campground not found");
              res.redirect("back");
          } else {
              //does the user own the campground?
            if(foundCamp.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "you do not have permission to do that");
                res.redirect("back");
                
            }
          }
      })
  }
}
// authentication
middlewareObj.checkCommentOwnership = function(req, res, next){
  if(req.isAuthenticated()){
      Comment.findById(req.params.comment_id, function(err, foundComment){
          if(err|| !foundComment){
              req.flash("error", "Campground not found");
              res.redirect("back");
          } else {
              //does the user own the comment?
            if(foundComment.author.id.equals(req.user._id)){
                next();
            } else {
                req.flash("error", "you do not have permission to do that");
                res.redirect("back");
                
            }
          }
      })
  }
}
//middleware
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next(); 
    }
    req.flash("error","you need to be logged in to do that");
    res.redirect("/login");
}



module.exports = middlewareObj;