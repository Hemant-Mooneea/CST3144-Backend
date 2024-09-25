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

app.get("/lessons", (req,res) => {
    //TODO - Get all lessons from the lessons collection
})

app.post("/order", (req,res) => {
    //TODO - Create a new order in the orders collection
})

app.get("/search", (req,res)=> {
    //TODO - Search for a lesson in the lessons collection
})

//! Ask what to use PUT route for(other than increase/decrease seat taken)
