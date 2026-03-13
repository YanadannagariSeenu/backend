const express = require("express");
const axios = require("axios");
const Weather = require("../models/Weather");

const router = express.Router();

const API_KEY = "bf512853d67c37be99c047e62593427d";

router.get("/:city", async (req, res) => {

 const city = req.params.city;

 try {

  const response = await axios.get(
   `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );

  const data = response.data;

  const weatherData = {

   city: city,
   temperature: data.list[0].main.temp,
   humidity: data.list[0].main.humidity,
   windSpeed: data.list[0].wind.speed,
   windDirection: data.list[0].wind.deg,
   forecast: data.list.slice(0,2)

  };

  const newWeather = new Weather(weatherData);
  await newWeather.save();

  res.json(weatherData);

 } catch (error) {

  res.status(500).json({message:"Error fetching weather"});

 }

});

module.exports = router;