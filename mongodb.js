import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";
export class MongoDatabase
{
    constructor()
    {
        // Initialising Username/Password/Server to access Cloud MongoDB
        const password = "M00935155";
        const username = "Hemant";
        const server = "private-tuition.llxya.mongodb.net";
        // URI Encoding
        const encodedUsername = encodeURIComponent(username);
        const encodedPassword = encodeURIComponent(password);
        // URI Connection link
        const connectionURI = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}`
        // Creating a MongoClient
        this.client = new MongoClient(connectionURI, {
            serverApi:
            {
                version: ServerApiVersion.v1,
                strict: false,
                deprecationErrors: true,
            }
        })
        this.connect();
    }
    async connect() 
    {
        try 
        {
            await this.client.connect();
            console.log("Connected to MongoDB server");
            this.database = this.client.db("Private_Tuition");
            this.lessonsCollection = this.database.collection("Lessons");
            this.ordersCollection = this.database.collection("Orders");
        }       
        catch (error) 
        {
           console.error("Error connecting to MongoDB server:", error);
        }
    }
    async getAllLessons()
    {
        try
        {
            const lessons = await this.lessonsCollection.find({}).toArray();
            return lessons;
        }
        catch(error)
        {
            console.error("Error getting lessons:", error);
        }
    }
    async addOrder(order)
    {
        try
        {
            const result = await this.ordersCollection.insertOne(order);
            return result;
        }
        catch(error)
        {
            console.error("Error adding order:", error);
        }
    }
    async updateLessonSpace(lessonID, newSpace) 
    {
        try 
        {
            await this.lessonsCollection.updateOne
            (
                { _id: new ObjectId(lessonID) }, 
                { $set: {space:newSpace}}  
            );
        }
        catch (error) 
        {
            console.error("Error updating lesson:", error);
        }
    }
    async searchTuitions(searchQuery)
    {
        try {
            const results = await this.lessonsCollection.find({
                $or: [
                    // Case-insensitive search for topic and location
                    { topic: { $regex: searchQuery, $options: 'i' } },
                    { location: { $regex: searchQuery, $options: 'i' } },
                    /*
                        expr allows for aggregated expressions to be used in the query
                        regexMatch allows for regex expressions to be used in the query
                        toString converts the price and space fields to strings
                    */
                    {
                        '$expr': {
                            '$regexMatch': {
                                'input': { '$toString': "$price" },
                                'regex': searchQuery
                            }
                        }
                    },
                    {
                        '$expr': {
                            '$regexMatch': {
                                'input': { '$toString': "$space" },
                                'regex': searchQuery
                            }
                        }
                    }
                ]
            }).toArray();
            return results;
        }
        catch (error)
        {
            console.error("Error performing search:", error);
        }
    }
}
