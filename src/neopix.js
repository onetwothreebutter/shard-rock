const { spawn } = require('child_process');

const pathToNeopix = require.resolve('node-red-node-pi-neopixel/neopix');

const startLEDs = () => {
  process.env.PYTHONUNBUFFERED = 1;

  const piCommandPath = pathToNeopix;
  const piLEDParams = {
    pixels: 10,
    wipe: 0,
    mode: 'pcent',
    brightness: 100,
    gamma: true,
  };
  console.log(piCommandPath);
  const piProcess = spawn(piCommandPath,
    [piLEDParams.pixels,
      piLEDParams.wipe,
      piLEDParams.mode,
      piLEDParams.brightness,
      piLEDParams.gamma]);
  return piProcess;
};

const setColor = (red, green, blue) => `${red},${green},${blue}\n`;

const setBrightness = (brightness) => `brightness,${brightness}\n`;

const setPixel = (position, red, green, blue) => `${position},${red},${green},${blue}\n`;

const twinkle = (startPixel, endPixel, color1, color2) => {
  const ledCommands = [];
  for (let i = startPixel; i < endPixel; i += 1) {
    const colorToUse = (i % 2 === 0) ? color1 : color2;
    ledCommands.push(setPixel(i, ...colorToUse));
  }
  return ledCommands;
};

module.exports = {
  startLEDs, setColor, setBrightness, setPixel, twinkle
};
