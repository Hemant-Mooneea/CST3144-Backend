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
        // Connecting to the Cloud Database
        this.connect();
    }
    // Method to connect to Cloud Database 
    async connect() 
    {
        try 
        {
            // Awaiting connection to cloud DB
            await this.client.connect();
            console.log("Connected to MongoDB server");;
        } 
        catch (error) 
        {
           console.error("Error connecting to MongoDB server:", error);
        }
    }
}
