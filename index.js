import express from "express";
import path from "path";
import { MongoDatabase } from "./mongodb.js";
import cors from "cors";
import morgan from "morgan";

// Create a new instance of the MongoDatabase class
const MongoDB = new MongoDatabase();
// Use express middleware to create a new express app
const app = express();
// Use CORS for cross-origin requests
app.use(cors());
// Use morgan for logging
app.use(morgan('short'));
// Define the port number
const PORT = 3000;
// Resolve directory name
const __dirname = path.resolve();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Use express middleware to parse JSON data
app.use(express.json());
// Serve the /images route to serve static files from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));
// Serve the /frontend GET route to retrieve all lessoms from MongoDB
app.get("/lessons", async (req, res) =>  
{
    try 
    {   
        const lessons = await MongoDB.getAllLessons();
        if(lessons.length === 0)
        {
            res.status(404).json({message:"No lessons found." });
        } 
        else
        {
            res.status(200).json(lessons);
        }
    } 
    catch (error) 
    {
        console.error("Error fetching lessons:", error);
        res.status(500).json({message:"Failed to fetch lessons." });
    }
});
// Serve the /order POST route to add an order to the MongoDB
app.post("/order", async (req,res) => 
{
    try
    {
        const order = req.body;
        await MongoDB.addOrder(order);
        res.status(201).json({message:"Order created successfully."});
    }
    catch(error)
    {
        console.error("Error creating order:", error);
        res.status(500).json({message:"Failed to create order." });
    }
});
// Serve the /lessons/:id PUT route to update a specific lesson
app.put("/lessons/:id", async(req,res) =>
{
    try     
    {
        // Get the lessonid from the request parameters
        const lessonID = req.params.id;
        // Get lesson data from the request body
        const newLesson = req.body.lesson;
        await MongoDB.updateLesson(lessonID, newLesson);
        res.status(200).json({message:"Updated number of spaces"});   
    } 
    catch (error) 
    {
        res.status(500).json({message:"Failed to update lesson spaces"})
    }
});
// Serve the /search GET route to search for lessons
app.get("/search", async(req,res) => 
{   
    try 
    {   
        // Get the search query from the request query
        const searchQuery = req.query.q;
        const results = await MongoDB.searchTuitions(searchQuery);
        if(results.length === 0)
        {
            res.status(404).json({message:"No lessons found." });
        }
        else
        {
            res.status(200).json(results);
        }
        
    } 
    catch (error) 
    {
        console.error("Error searching for lessons:", error);
        res.status(500).json({message:"Failed to search for lessons." });
    }
});

