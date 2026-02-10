const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");



const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";



main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });



async function main() {
    await mongoose.connect(MONGO_URL);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate); //to use the boilerplate
app.use(express.static(path.join(__dirname, "/public")));



app.get("/", (req, res) => {
    res.send("Hi, I am root");
});



app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews)



// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "calangute, Goa",
//         country: "India",
//     });

//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successful testing");
// });


app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});


//errors are sent with css
app.use((err, req, res, next) => {
    let { statusCode=500, message="Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});


app.listen(8080, () => {
    console.log("Server is listening to port 8080");
});
