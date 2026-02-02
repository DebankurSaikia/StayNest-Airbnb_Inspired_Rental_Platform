const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default:
            "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-wooden-ceiling-KPK_Qn2Pc5s",
        set: (v) =>
            v === ""
                ? "https://unsplash.com/photos/a-living-room-filled-with-furniture-and-a-wooden-ceiling-KPK_Qn2Pc5s" 
                : v,
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
