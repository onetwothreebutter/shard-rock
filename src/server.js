const express = require('express');

const app = express();
const port = 3000;
const { startLEDs, setColor, setPixel, setBrightness } = require('./neopix');

const pythonProcess = startLEDs();

app.get('/', (req, res) => {
  if (req.query.setColor) {
    const { red, green, blue } = req.query;
    pythonProcess.stdin.write(setColor(red, green, blue));
    console.log(`Color set to ${req.query.color}`);
  } else if (req.query.setPixel) {
    const {
      position, red, green, blue,
    } = req.query;
    pythonProcess.stdin.write(setPixel(position, red, green, blue));
  } else if (req.query.brightness) {
    const { brightness } = req.query.brightness;
    pythonProcess.stdin.write(setBrightness(brightness));
    console.log(`Brightness set to ${req.query.brightness}`);
  } else {
    res.send('Hello word');
  }
});

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
