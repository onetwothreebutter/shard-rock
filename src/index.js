var spawn = require('child_process').spawn;

// the magic to make python print stuff immediately
process.env.PYTHONUNBUFFERED = 1;

const piCommandPath = '../node_modules/node-red-node-pi-neopixel/neopix';
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

piProcess.stdin.write("brightness,100\n");