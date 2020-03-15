const spawn = require('child_process').spawn;
const getWeatherData = require('./weather-data');

const pathToNeopix = require.resolve("node-red-node-pi-neopixel/neopix");

async function getData() {
  const weatherData = await getWeatherData('41.673780', '-91.757270');
  console.log(JSON.stringify(weatherData.data));
};

//setInterval(getData, 1000);

// the magic to make python print stuff immediately
process.env.PYTHONUNBUFFERED = 1;

const piCommandPath = pathToNeopix;
const piLEDParams = {
  pixels: 10,
  wipe: 40,
  mode: 'pcent',
  brightness: 100,
  gamma: true,
};
console.log(piCommandPath);
const piProcess = spawn(piCommandPath, [piLEDParams.pixels, piLEDParams.wipe, piLEDParams.mode, piLEDParams.brightness, piLEDParams.gamma]);

// the magic to make python print stuff immediately
process.env.PYTHONUNBUFFERED = 1;

//piProcess.stdin.write("255,127,8\n"); // orange
piProcess.stdin.write("13,6,244\n"); // purple


// cold temperature (below 32F is a big deal)

// warm tempature (above 90F is a big deal)

// windy (above 15 mph is a big deal)

// rain is a big deal always

// snow is a big deal always

// hail is a big deal always

// severe weather is a big deal

// sunrise/sunset

// full moon

// clouds vs sun

// peaceful pleasant days are a big deal


