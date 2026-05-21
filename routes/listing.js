const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });

// const { renderNewForm } = require("../controllers/listing.js");

//Index Route and //Create Route
router.route("/")
.get(wrapAsync(listingController.index))//index route 
.post(isLoggedIn,
    upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.createListing));

//New Route 
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show route,update,and delete route 
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put(isLoggedIn,isOwner,
     upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing ))
.delete( isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
module.exports=router;


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync ( listingController.renderEditForm));
