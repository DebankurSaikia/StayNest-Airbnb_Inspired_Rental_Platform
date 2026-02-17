const express = require("express");
const router = express.Router({ mergeParams: true });//agar parent route ke andar kuch parameters hain jo use ho sakte hain child ke andar toh mergeparams : true likhna padta hain
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");


//Reviews
//POST Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();//existing document ke andar kuch naya add karne ke liye save function call karna padta hain

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));

//DELETE Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(async (req, res) => {
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});//$pull operator removes from an existing array all instances of a value or value that match a specified condition

    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
}));


module.exports = router;