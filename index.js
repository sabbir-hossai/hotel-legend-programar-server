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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l12hi.mongodb.net/Hotel-managment?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        console.log("connected to database");

        const database = client.db('Hotel-managment');
        const foodCollection = database.collection('foodCollection')
        const roomCollection = database.collection('roomCollection')
        // database post all room
        app.post('/rooms', async (req, res) => {
            const service = req.body;
            console.log('hit the post', service)

            const result = await roomCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // res.json('post hitten')
        });
        //get database load the data home page 
        app.get('/rooms', async (req, res) => {
            const cursor = roomCollection.find({})
            const result = await cursor.toArray();
            res.json(result)
        })

        // database post all products 

        app.post('/foods', async (req, res) => {
            const service = req.body;
            console.log('hit the post', service)

            const result = await foodCollection.insertOne(service)
            console.log(result)
            res.json(result)
            // res.json('post hitten')
        });

        //get database load the data home page 
        app.get('/foods', async (req, res) => {
            const cursor = foodCollection.find({})
            const result = await cursor.toArray();
            res.json(result)
        })



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

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir)

app.get("/", (req, res) => {
    res.send("Hello World!  ");
});

app.listen(port, () => {
    console.log("runnning online on port", port)
});