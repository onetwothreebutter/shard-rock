const express = require('express');

const app = express();
const port = 3000;
const {
  startLEDs, setColor, setPixel, setBrightness, twinkle,
} = require('./neopix');

const pythonProcess = startLEDs();

app.get('/', (req, res) => {
  if (req.query.setColor) {
    const { red, green, blue } = req.query;
    pythonProcess.stdin.write(setColor(red, green, blue));
    console.log(`Color set to rgb(${setColor(red, green, blue)})`);
  } else if (req.query.setPixel) {
    const {
      position, red, green, blue,
    } = req.query;
    pythonProcess.stdin.write(setPixel(position, red, green, blue));
  } else if (req.query.brightness) {
    const { brightness } = req.query.brightness;
    pythonProcess.stdin.write(setBrightness(brightness));
    console.log(`Brightness set to ${brightness}%`);
  } else {
    res.send('Hello word');
  }
});

app.get('/twinkle', (req, res) => {
  let count = 0;
  setInterval(() => {
    if (count % 2 === 0) {
      twinkle(0, 10, [255, 0, 0]).twinkleState1.forEach((command) => {
        pythonProcess.stdin.write(command);
      });
    } else {
      twinkle(1, 11, [255, 0, 0]).twinkleState2.forEach((command) => {
        pythonProcess.stdin.write(command);
      });
    }
    count += 1;
    console.log('twinkle');
  }, 500);
  res.send('Twinkling...');
});

app.use(express.static(`${__dirname}/../public`));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
