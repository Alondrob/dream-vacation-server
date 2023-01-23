const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PropertyModel = require("./models/Property");
const bodyParser = require("body-parser");
const propertyRouter = require("./routes/propertiesRoutes");
const userRouter = require("./routes/userRoutes");
const path = require('path');

const app = express();
app.use(cors());
const _dirname = path.dirname("")
const buildPath = path.join(_dirname, "../client/build")
app.use(express.static(buildPath));

app.get("/", (req, res) => {
  res.sendFile(
     path.join(_dirname, "../client/build/index.html"),
    (err) => {
      if (err) {
        res.status(500).send(err);
      }
    }
  )
})



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoDBUrl = process.env.MONGODB_URL;

mongoose.connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console.log("server is running"), "mongodb connection error;"));

// property routes
app.use("/property", propertyRouter);

// user routes
app.use("/user", userRouter);

app.get("/test", (req, res) => {
  res.json("hitting the route");
});

app.listen(3001, () => ("Server is running!"));
