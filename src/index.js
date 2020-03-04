var RED = require('node-red/lib/red');
var neopixel = require('node-red-node-pi-neopixel/neopixel');
var http = require('http');
const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello, World!</h1>')
})

RED.init(server, {});
var configuredNeopixel = neopixel(RED);


//
//
// var spawn = require('child_process').spawn;
//
// // the magic to make python print stuff immediately
// process.env.PYTHONUNBUFFERED = 1;
//
// const piCommandPath = '../node_modules/node-red-node-pi-neopixel/neopix';
// const piLEDParams = {
//   pixels: 10,
//   wipe: '40',
//   mode: 'pcent',
//   brightness: 100,
//   gamma: true,
// };
// const piProcess = spawn(piCommandPath, [piLEDParams.pixels, piLEDParams.wipe, piLEDParams.mode, piLEDParams.brightness, piLEDParams.gamma]);
//
// //
// try {
//   var cpuinfo = fs.readFileSync("/proc/cpuinfo").toString();
//   if (cpuinfo.indexOf(": BCM") === -1) {
//     RED.log.warn("rpi-neopixels : "+RED._("node-red:rpi-gpio.errors.ignorenode"));
//     allOK = false;
//   }
//   else if (execSync('python -c "import rpi_ws281x"').toString() !== "") {
//     RED.log.warn("rpi-neopixels : Can't find neopixel python library");
//     allOK = false;
//   }
//   else if (!(1 & parseInt ((fs.statSync(piCommand).mode & parseInt ("777", 8)).toString (8)[0]))) {
//     RED.log.warn("rpi-neopixels : "+RED._("node-red:rpi-gpio.errors.needtobeexecutable",{command:piCommand}));
//     allOK = false;
//   }
// }
// catch(err) {
//   RED.log.warn("rpi-neopixels : "+RED._("node-red:rpi-gpio.errors.ignorenode"));
//   allOK = false;
// }
//
// // the magic to make python print stuff immediately
// process.env.PYTHONUNBUFFERED = 1;
//
// spawn(piCommand, [node.pixels, node.wipe, node.mode, node.brightness, node.gamma]);
// node.child.stdin.write("brightness,"+msg.brightness.toString()+"\n");