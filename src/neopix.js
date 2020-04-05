const { spawn } = require('child_process');

const pathToNeopix = require.resolve('node-red-node-pi-neopixel/neopix');
const convert = require('color-convert');

const eases = require('eases');

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

const setBrightness = (brightness) => `brightness,${parseInt(brightness, 10)}\n`;

const setPixel = (position, red, green, blue) => `${position},${red},${green},${blue}\n`;

const twinkle = (startPixel, endPixel, color) => {
  const hsl = convert.rgb.hsl(...color);
  // create the muted color by subtracting from the Lightness
  const twinkleColor = convert.hsl.rgb([hsl[0], hsl[1], hsl[2] - 10]);
  const ledCommands = { twinkleState1: [], twinkleState2: [] };
  for (let i = startPixel; i < endPixel; i += 1) {
    const colorToUse = (i % 2 === 0) ? color : twinkleColor;
    ledCommands.twinkleState1.push(setPixel(i, ...colorToUse));
  }
  for (let i = startPixel; i < endPixel; i += 1) {
    const colorToUse = (i % 2 === 0) ? twinkleColor : color;
    ledCommands.twinkleState2.push(setPixel(i, ...colorToUse));
  }

  return ledCommands;
};

// let's try duration being in ms
const pulse = (duration, easing) => {
  const pulseCommands = [];

  const startBrightness = 80;
  const endBrightness = 100;

  // we only execute every 20ms, so divide duration by 20
  const adjustedDuration = parseInt(duration / 20);

  // go up the easing curve
  for (let i = 0; i < adjustedDuration / 2; i += 1) {
    const currentBrightness = startBrightness
      + ((endBrightness - startBrightness) * eases.cubicOut(i / adjustedDuration));
    pulseCommands.push(setBrightness(currentBrightness));
  }

  // go down the easing curve
  for (let i = adjustedDuration / 2; i > 0; i -= 1) {
    const currentBrightness = startBrightness
      + ((endBrightness - startBrightness) * eases.cubicOut(i / adjustedDuration));
    pulseCommands.push(setBrightness(currentBrightness));
  }


  return pulseCommands;
};

module.exports = {
  pulse, startLEDs, setColor, setBrightness, setPixel, twinkle,
};
