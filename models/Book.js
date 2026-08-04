import mongoose from "mongoose";
import { BOOK_STATUS } from "../lib/constants";

const bookSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],

        status: {
            type: String,
            enum: Object.values(BOOK_STATUS),
            default: BOOK_STATUS.WANT_TO_READ,
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.Book ||
  mongoose.model("Book", bookSchema);