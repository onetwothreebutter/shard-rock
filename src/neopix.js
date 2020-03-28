const spawn = require('child_process').spawn;

const pathToNeopix = require.resolve("node-red-node-pi-neopixel/neopix");

const startLEDs = () => {
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
  return piProcess;
}

module.exports = startLEDs;