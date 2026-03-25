const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const weatherRoutes = require("./routes/weather");

// 👇 ADD THIS
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/weatherDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// existing route
app.use("/api/weather", weatherRoutes);

// 👇 ADD THIS
app.use("/api/auth", authRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});