const express = require('express')
const app = express();
const port = 3000;

const spawn = require('child_process').spawn;
const pythonProcess = spawn('node', [`${__dirname}/index.js`]);

app.get('/', (req, res) => {
  res.send('Hello word');

  if (req.query.color) {
    pythonProcess.stdin.write('${req.query.color}\n');
    res.send(`Color set to ${req.query.color}`);
  }

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))