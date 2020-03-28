const startLEDs = require('./neopix');
const getWeatherData = require('./weather-data');
const colorConvert = require('color-convert');


async function getData() {
  const weatherData = await getWeatherData('41.673780', '-91.757270');
  console.log(JSON.stringify(weatherData.data));
};

const pyProcess = startLEDs();


