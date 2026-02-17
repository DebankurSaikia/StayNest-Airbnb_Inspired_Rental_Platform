const express = require("express");
const router = express.Router();//router object
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


const listingController = require("../controllers/listings.js");


router
    .route("/")
    .get(wrapAsync(listingController.index))//Index Route
    .post( //Create Route
        isLoggedIn, 
        validateListing,
        wrapAsync(listingController.createListing)
    );


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm );



router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))//Show Route
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))//Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));//Delete Route



//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;