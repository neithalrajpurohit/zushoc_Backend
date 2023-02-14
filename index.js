require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { connectDB } = require("./db/db.connect.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const auth = require("./routers/auth.router.js");
const post = require("./routers/post.router.js");
const feed = require("./routers/feed.router.js");

connectDB();

app.get("/", (req, res) => {
    res.send("Hello Express app!");
});
app.use("/auth", auth);
app.use("/post", post);
app.use("/feed", feed);

app.listen(4000, () => {
    console.log("server started");
});
