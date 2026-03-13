const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({

 city: String,
 temperature: Number,
 humidity: Number,
 windSpeed: Number,
 windDirection: Number,
 forecast: Array,
 date: {
   type: Date,
   default: Date.now
 }

});

module.exports = mongoose.model("Weather", WeatherSchema);