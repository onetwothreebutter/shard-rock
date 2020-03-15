const spawn = require('child_process').spawn;
const getWeatherData = require('./weather-data');
const colorConvert = require('color-convert');

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
piProcess.stdin.write("155,88,181\n"); // purple


// 110F
// hue = 324

// 100F
// hue = 6

// 90F
// hue = 30

// 80F
// hue = 47

// 70F
// hue = 55

// 60F
// hue = 94

// 50F
// hue = 116

// 40F
// hue = 161

// cold temperature (below 32F is a big deal)
// hue = 216
piProcess.stdin.write("155,88,181\n"); // purple

// cold temperature (below 20F is another big deal)
// hue = 260

// cold temp (below 0F is another big deal)
// hue = 282

piProcess.stdin.write("155,88,181\n"); // purple

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


