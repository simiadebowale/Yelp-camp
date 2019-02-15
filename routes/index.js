var express        = require("express"),
    passport       = require("passport"),
    User           = require("../models/user"),
    middlewareObj  = require("../middleware"),
    router  = express.Router();




//root Route
router.get("/", function(req, res){
   res.render("landingpage");
});

//===================
//Auth Routes
//===================

//get register form route
router.get("/register", (req, res)=>{
    res.render("register");
});

// handle sign up logic Route
router.post("/register",(req, res)=>{
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "welcome to YelpCamp "+ user.username);
            res.redirect("/campgrounds");
        })

    });
});

//show login form
router.get("/login",(req, res)=>{
    res.render("login");
});

//handling login logic

router.post("/login", passport.authenticate("local",
    { successRedirect:"/campgrounds",
        failureRedirect: "/login"
    }), (req, res)=>{
    
});

//logout Route

router.get("/logout",(req, res)=>{
    req.logout();
    req.flash("success", "logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;