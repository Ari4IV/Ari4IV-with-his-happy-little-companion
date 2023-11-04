import Express from 'express';
import { SerialPort } from 'serialport'

console.log(await SerialPort.list());
const port = '/dev/tty.usbmodem101'

const serialport = new SerialPort({ path: port, baudRate: 9600 });
const app = Express();

app.get('/', function (req, res) {
    return res.sendFile('/index.html', { root: '.' });
});

app.get('/on', function (req, res) {
    console.log('LED ON');
    serialport.write("1\n");
    return res.end();
});

app.get('/off', function (req, res) {
    console.log('LED OFF');
    serialport.write("0\n");
    return res.end();
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});