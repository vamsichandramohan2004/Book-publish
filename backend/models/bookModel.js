import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true, // Ensures each custom ID is unique
        },
        title: {
            type: String,
            required: true
        }, 
        subgenre: {
            type: String,
            required: false 
        },
        author: {
            type: String,
            required: true 
        }, 
        publishYear: {
            type: Number,
            required: true 
        }, 
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model("Books", bookSchema);
