const express = require("express");
const axios = require("axios");
const Weather = require("../models/Weather");

const router = express.Router();

const API_KEY = "bf512853d67c37be99c047e62593427d";

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    if (!data || !data.list || data.list.length === 0) {
      return res.status(400).json({ message: "Invalid city name" });
    }

    const weatherData = {
      city: city,
      temperature: data.list[0].main?.temp,
      humidity: data.list[0].main?.humidity,
      windSpeed: data.list[0].wind?.speed,
      windDirection: data.list[0].wind?.deg,
      forecast: data.list.slice(0, 5)
    };

    await Weather.create(weatherData);

    res.json(weatherData);

  } catch (error) {
    console.log("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Weather fetch failed",
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;