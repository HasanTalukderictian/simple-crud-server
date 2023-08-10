const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//middleware
app.use(cors());
app.use(express.json())


// SimpleCrud // 5ewJ18JiLyPneLMW




const uri = "mongodb+srv://SimpleCrud:5ewJ18JiLyPneLMW@cluster0.vtmwivk.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const usersCollection = database.collection("users");



    app.get('/users',async(req, res)=>{
        const cursor = usersCollection.find()
        const result = await cursor.toArray()
        res.send(result)
    })

   app.post('/users', async(req, res) =>{
     const user = req.body;
     console.log('new user', user);
     const result = await usersCollection.insertOne(user);
     res.send(result);
     if(database.insertedId){
        alert('Users Added Successfully')
        form.reset();
     }
   })

   app.delete('/users/:id', async(req, res)=>{
    const id =req.params.id;
    console.log('Delete Id from Database', id);
    const query ={ _id: new ObjectId(id)}
    const result = await usersCollection.deleteOne(query)
    res.send(result);
   })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Simple Crud is Running')
})

app.listen(port, () => {
  console.log(`Simple Crud is Running on port ${port}`)
})