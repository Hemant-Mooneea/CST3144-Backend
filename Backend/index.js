import express from "express";
import path from "path";
import { MongoDatabase } from "./mongodb.js";

const MongoDB = new MongoDatabase();

const app = express();

const PORT = 3000;

const __dirname = path.resolve();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/lessons", async (req, res) => {
    try 
    {   
        const lessons = await MongoDB.getLessons();
        if(lessons.length === 0)
        {
            res.status(404).json({ message: "No lessons found." });
        } 
        res.status(200).json(lessons);
    } 
    catch (error) 
    {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: "Failed to fetch lessons." });
    }
});

app.post("/order", (req,res) => {
    //TODO - Create a new order in the orders collection
})

app.get("/search", (req,res)=> {
    //TODO - Search for a lesson in the lessons collection
})

//! Ask what to use PUT route for(other than increase/decrease seat taken)
