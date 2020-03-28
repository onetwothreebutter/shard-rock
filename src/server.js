const express = require('express')
const app = express();
const port = 3000;
const startLEDs = require('./neopix');

const pythonProcess = startLEDs();

app.get('/', (req, res) => {

  if (req.query.color) {
    pythonProcess.stdin.write(`${req.query.color}\n`);
    res.send(`Color set to ${req.query.color}`);
  } else {
    res.send('Hello word');
  }

});

app.use(express.static('public'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))