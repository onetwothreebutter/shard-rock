const express = require('express')
const app = express();
const port = 3000;

const spawn = require('child_process').spawn;

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.get('/color', (req, res) => {
  const pythonProcess = spawn('node', [`${__dirname}/index.js`]);
  pythonProcess.stdin.write("155,88,181\n");
  res.send('Color set to:'+JSON.stringify(req));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))