const express = require('express')
const app = express();
const port = 3000;
const startLEDs = require('./neopix');


app.get('/', (req, res) => {
  
  if (req.query.color) {
    const pythonProcess = startLEDs();
    pythonProcess.stdin.write('${req.query.color}\n');
    res.send(`Color set to ${req.query.color}`);
  } else {
    res.send('Hello word');
  }

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))