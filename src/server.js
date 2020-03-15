const express = require('express')
const app = express();
const port = 3000;
var exec = require('child_process').exec

const spawn = require('child_process').spawn;

app.get('/', (req, res) => {
  exec('node ./index.js');
  res.send('Hello word');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))