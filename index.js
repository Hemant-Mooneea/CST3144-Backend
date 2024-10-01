import express from "express";
import path from "path";
import { MongoDatabase } from "./mongodb.js";

const MongoDB = new MongoDatabase();

const app = express();

const PORT = 3000;

const __dirname = path.resolve();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());

app.get("/", (req, res) => 
{
    res.send("Hello World!");
});

app.get("/lessons", async (req, res) => 
{
    try 
    {   
        const lessons = await MongoDB.getAllLessons();
        if(lessons.length === 0)
        {
            res.status(404).json({message:"No lessons found." });
        } 
        res.status(200).json(lessons);
    } 
    catch (error) 
    {
        console.error("Error fetching lessons:", error);
        res.status(500).json({message:"Failed to fetch lessons." });
    }
});

app.post("/order", (req,res) => 
{
    try
    {
        const order = req.body;
        MongoDB.addOrder(order);
        res.status(201).json({message:"Order created successfully."});
    }
    catch(error)
    {
        console.error("Error creating order:", error);
        res.status(500).json({message:"Failed to create order." });
    }
});

app.put("/lessons/:id", async(req,res) =>
{
    try     
    {
        const lessonID = req.params.id;
        const newSpaces = req.body.space;
        await MongoDB.updateLessonSpace(lessonID, newSpaces);
        res.status(200).json({message:"Updated number of spaces"});   
    } 
    catch (error) 
    {
        res.status(500).json({message:"Failed to update lesson spaces"})
    }
});

app.get("/search", async(req,res) => 
{   
    try 
    {
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

