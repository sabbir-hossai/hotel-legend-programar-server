const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


<<<<<<< HEAD

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l12hi.mongodb.net/Hotel_managment?retryWrites=true&w=majority`;
=======
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l12hi.mongodb.net/Hotel-managment?retryWrites=true&w=majority`;
>>>>>>> 29ffb361afe10d7c6ffb4b97cd5f6f3ae4607654
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
<<<<<<< HEAD
        const database = client.db("Hotel_managment");
        const popularRoomsCollection = database.collection("roomCollection");
        const popularFoodCollection = database.collection("foodCollection");
        const confirmFoodOrderCollection = database.collection("FoodOrders");
        const confirmRoomOrderCollection = database.collection("RoomOrders");
        // const reviewsCollection = database.collection("reviews");
        // const usersCollection = database.collection("laptopUsers");


        app.post('/foods', async (req, res) => {
            const appointment = req.body;
            const result = await popularFoodCollection.insertOne(appointment);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result)
        })
=======
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


>>>>>>> 29ffb361afe10d7c6ffb4b97cd5f6f3ae4607654

        app.get('/foods', async (req, res) => {
            // const email = req.query.email;
            // const query = { email: email }
            const cursor = popularFoodCollection.find({})
            const result = await cursor.toArray();
            res.json(result)
        })
        app.post('/confirmFoods', async (req, res) => {
            const room = req.body;
            const result = await confirmFoodOrderCollection.insertOne(room);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result)
<<<<<<< HEAD
        })
        //  get my orders
        app.get('/confirmFoods', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const cursor = confirmFoodOrderCollection.find(query)
            const appointments = await cursor.toArray();
            res.json(appointments)
        })

        // rooms --------------------------start
        app.post('/rooms', async (req, res) => {
            const appointment = req.body;
            const result = await popularRoomsCollection.insertOne(appointment);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result)
        })

        app.get('/rooms', async (req, res) => {
            // const email = req.query.email;
            // const query = { email: email }
            const cursor = popularRoomsCollection.find({})
            const result = await cursor.toArray();
            res.json(result)
        })

        // order  api start 
        app.post('/confirmRooms', async (req, res) => {
            const room = req.body;
            const result = await confirmRoomOrderCollection.insertOne(room);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.json(result)
        })
        //  get my orders
        app.get('/confirmRooms', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const cursor = confirmRoomOrderCollection.find(query)
            const appointments = await cursor.toArray();
            res.json(appointments)
        })
        // rooms --------------------------end

        // manage admin all Order 
        app.get('/allOrders', async (req, res) => {
            // const email = req.query.email;
            // const query = { email: email }
            const cursor = confirmLaptopOrderCollection.find({})
            const appointments = await cursor.toArray();
            res.json(appointments)
        })
        // delete api 
        app.delete('/confirmOrders/:id', async (req, res) => {
            const id = req.params.id;
            console.log('deleting with id', id);
            const query = { _id: ObjectId(id) };
            const result = await confirmLaptopOrderCollection.deleteOne(query);
            res.json(result);
        })

        // // all products 

        // // create products 
        // app.post('/productAdd', async (req, res) => {
        //     const appointment = req.body;
        //     console.log(appointment)
        //     const result = await popularLaptopsCollection.insertOne(appointment);
        //     console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //     res.json(result)
        // })




        // app.get('/popularlaptops/:id', async (req, res) => {
        //     const id = req.params.id;
        //     const query = { _id: ObjectId(id) };
        //     const user = await popularLaptopsCollection.findOne(query);
        //     // console.log('load user with id: ', id);
        //     res.send(user);
        // })

        // // detele products 

        // app.delete('/popularlaptops/:id', async (req, res) => {
        //     const id = req.params.id;
        //     console.log('deleting with id', id);
        //     const query = { _id: ObjectId(id) };
        //     const result = await popularLaptopsCollection.deleteOne(query);
        //     res.json(result);
        // })



        // // get reviews ..................start 
        // // post reviews 
        // app.post('/reviews', async (req, res) => {
        //     const reviews = req.body;
        //     console.log(reviews)
        //     const result = await reviewsCollection.insertOne(reviews);
        //     console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //     res.json(result)
        // })

        // // get api 
        // app.get('/reviews', async (req, res) => {
        //     // const email = req.query.email;
        //     // const query = { email: email }
        //     const cursor = reviewsCollection.find({})
        //     const appointments = await cursor.toArray();
        //     res.json(appointments)
        // })


        // // user api .............  start
        // app.post('/users', async (req, res) => {
        //     const user = req.body;
        //     console.log(user)
        //     const result = await usersCollection.insertOne(user);
        //     console.log(`A document was inserted with the _id: ${result.insertedId}`);
        //     res.json(result)
        // })



        // // user ..................... make admin 
        // app.put('/users/admin', async (req, res) => {
        //     const user = req.body;
        //     console.log(user)
        //     const filter = { email: user.email };
        //     const updateDoc = { $set: { role: 'admin' } };
        //     const result = await usersCollection.updateOne(filter, updateDoc)
        //     res.json(result)

        // })
        // // get admin 
        // app.get('/users/admin/:email', async (req, res) => {
        //     const email = req.params.email;
        //     const query = { email: email }
        //     const user = await usersCollection.findOne(query);
        //     let isAdmin = false;
        //     if (user?.role === 'admin') {
        //         isAdmin = true;
        //     }
        //     res.json({ admin: isAdmin })
        // })

    } finally {
=======
        });

    }
    finally {
>>>>>>> 29ffb361afe10d7c6ffb4b97cd5f6f3ae4607654
        // await client.close();
    }
}
run().catch(console.dir);

<<<<<<< HEAD
app.get('/', (req, res) => {
    res.send('Hello group project')
})
=======
app.get("/", (req, res) => {
    res.send("Hello World!  ");
});
>>>>>>> 29ffb361afe10d7c6ffb4b97cd5f6f3ae4607654

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})