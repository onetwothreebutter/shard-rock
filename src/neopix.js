const { spawn } = require('child_process');

const pathToNeopix = require.resolve('node-red-node-pi-neopixel/neopix');
const convert = require('color-convert');

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

const twinkle = (startPixel, endPixel, color) => {
  const hsl = convert.rgb.hsl(...color);
  const twinkleColor = convert.hsl.rgb([hsl[0], hsl[1], hsl[2] - 30]);
  console.log(twinkleColor);
  const ledCommands = [];
  for (let i = startPixel; i < endPixel; i += 1) {
    const colorToUse = (i % 2 === 0) ? color : twinkleColor;
    ledCommands.push(setPixel(i, ...colorToUse));
  }
  return ledCommands;
};

module.exports = {
  startLEDs, setColor, setBrightness, setPixel, twinkle,
};
