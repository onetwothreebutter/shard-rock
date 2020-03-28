const express = require('express')
const app = express();
const port = 3000;
const startLEDs = require('./neopix');

const pythonProcess = startLEDs();

app.get('/', (req, res) => {

  if (req.query.color) {
    pythonProcess.stdin.write(`${req.query.color}\n`);
    console.log(`Color set to ${req.query.color}`);
  } else if(req.query.brighness) {
    pythonProcess.stdin.write(`brightness,${req.query.brighness}\n`);
    console.log(`Brightness set to ${req.query.brightness}`);
  }else {
    res.send('Hello word');
  }

});

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))