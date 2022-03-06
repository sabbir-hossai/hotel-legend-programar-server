const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;


const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = "mongodb+srv://<username>:<password>@cluster0.ev8on.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        console.log("connected to database");

        const database = client.db('resturant');
        const foodCollection = database.collection('Addfood')
        const roomCollection = database.collection('Add-room')
        const confirmRoomCollection = database.collection('Confirm-room')

        // database post all products 
        app.post('/food', async (req, res) => {
            const service = req.body;
            console.log('hit the post', service)

            const result = await foodCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // res.json('post hitten')
        });

        //get database load the data home page 
        app.get('/food', async (req, res) => {
            const cursor = foodCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        });

        // parchage page or details page of get api 
        app.get('/food/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await foodCollection.findOne(query)
            res.json(result)
        });
        app.get('/room/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await roomCollection.findOne(query)
            res.json(result)
        });

        // database post all room
        app.post('/room', async (req, res) => {
            const service = req.body;
            console.log('hit the post', service)

            const result = await roomCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // res.json('post hitten')
        });

        app.get('/room', async (req, res) => {
            const cursor = roomCollection.find({})
            const result = await cursor.toArray()
            res.json(result)
        });

        app.post('/confirmRoom', async (req, res) => {
            const service = req.body;
            console.log('hit the post', service)

            const result = await roomCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // res.json('post hitten')
        });

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log("runnning online on port", port)
});