const express = require('express')
const app = express();
const port = 3000;

const spawn = require('child_process').spawn;
const pythonProcess = spawn('node ./index.js');

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.get('/color', (req, res) => {
  pythonProcess.stdin.write("155,88,181\n");
  res.send('Color set to:'+req);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))