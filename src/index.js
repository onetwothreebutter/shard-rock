var spawn = require('child_process').spawn;

const pathToNeopix = require.resolve("node-red-node-pi-neopixel/neopix");

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

piProcess.stdin.write("brightness,100\n");

setTimeout( () => {
  piProcess.stdin.write("brightness,0\n");
}, 4000);

setTimeout( () => {
  piProcess.stdin.write("brightness,100\n");
}, 8000);