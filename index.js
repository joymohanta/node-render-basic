const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middle ware
app.use(cors());
app.use(express.json());

// Mongodb connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.joqkugn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const devicesCollection = client.db("render_basic").collection("devices");
    app.get("/devices", async (req, res) => {
      const query = {};
      const cursor = devicesCollection.find(query);
      const devices = await cursor.toArray();
      res.send(devices);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World Joy!");
});

app.listen(port, () => {
  console.log(`Node basic is listening on port ${port}`);
});
