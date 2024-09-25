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