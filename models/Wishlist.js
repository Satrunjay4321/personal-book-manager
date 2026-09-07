import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
    {
        // Book information
        title: {
            type: String,
            required: true,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        summary: {
            type: String,
            default: "",
            trim: true,
        },

        pageCount: {
            type: Number,
            required: true,
            min: 1,
        },

        pagesRead: {
            type: Number,
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: [
                "Want to Read",
                "Reading",
                "Completed",
            ],
            default: "Want to Read",
        },

        // Owner
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Wishlist =
    mongoose.models.Wishlist ||
    mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;