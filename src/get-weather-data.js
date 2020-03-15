const axios = require('axios');

const getWeatherData = async (lat, lon) => {
  try {
    let url = `https://weather-orb.netlify.com/.netlify/functions/get-weather-data?lat=${lat}&lon=${lon}`;
    return await axios.post(url);
  } catch (error) {
    console.error(error);
  }
}

module.exports = getWeatherData;