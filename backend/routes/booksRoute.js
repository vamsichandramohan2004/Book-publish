import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

// Route to Save a new Book 
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.subgenre ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, subgenre, author, publish Year"
            });
        }
        
        // Find the highest existing ID to generate a new sequential one
        const highestBook = await Book.findOne().sort('-id');
        const newId = highestBook ? highestBook.id + 1 : 1;

        const newBook = {
            id: newId, // Assign the new custom ID
            title: request.body.title,
            subgenre: request.body.subgenre,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message })
    }
});

// Route to get all Books with combined search and filter functionality
router.get("/", async (request, response) => {
    try {
        const { search, subgenre, author, publishYear } = request.query;
        let query = {};

        // Combine search and specific filter criteria into a single query object.
        // The search logic uses $or to match any field, while other filters use direct equality.
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
                { subgenre: { $regex: search, $options: "i" } },
            ];
        }

        if (subgenre) {
            query.subgenre = { $regex: subgenre, $options: "i" };
        }

        if (author) {
            query.author = { $regex: author, $options: "i" };
        }
        
        if (publishYear) {
            // Ensure publishYear is treated as a number for filtering
            query.publishYear = Number(publishYear);
        }

        const books = await Book.find(query);

        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a single Book by its id
router.get("/:_id", async (request, response) => {
    try{
        const { _id } = request.params;

        const book = await Book.findById(_id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
}); 

// Route to update a single Book
router.put("/:_id", async (request, response) => {
    try{
        if(
            !request.body.title ||
            !request.body.subgenre ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, author, yearReleased"
            });
        }
        
        const { _id } = request.params;
        
        const result = await Book.findByIdAndUpdate(_id, request.body); 

        if (!result) {
            return response.status(404).json({ message: "Book not found "});
        }
        return response.status(200).send({ message: " Book updated successfully"});
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

// Route to delete a single Book 
router.delete("/:_id", async (request, response) => {
    try{
        const { _id } = request.params;

        const result = await Book.findByIdAndDelete(_id);
        
        if (!result) {
            return response.status(404).send({ message:"Book not found"});   
        }

        return response.status(200).send({ message:"Book deleted successfully"});
        
    }catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
});

export default router;