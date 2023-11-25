import Express from 'express';
import { SerialPort, ReadlineParser } from 'serialport';
import { WebSocketServer } from "ws";

let wss;

SerialPort.list().then(ports => {
    ports.forEach(port => {
    console.log(port.path);
  });
}).catch(err => console.error(err));

const serialPortPath = '/dev/tty.usbmodem101';
const serial = new SerialPort({ path: serialPortPath, baudRate: 9600 });

const sendToBrowser = msg => {
    wss.clients.forEach(client => {
        client.send(msg);
    });
}

const receiveFromArduino = (msg) => {
    console.log(`<-- ${msg}`);
    sendToBrowser(`<-- ${msg}`);
}

const parser = new ReadlineParser();
serial.pipe(parser);
parser.on('data', receiveFromArduino);

const sentToArduino = (msg) => {
    console.log(`--> ${msg}`);
    sendToBrowser(`--> ${msg}`);
    serial.write( `${msg}\n`);
}

const app = Express();

app.get('/', function (req, res) {
    return res.sendFile('/index.html', { root: '.' });
});

app.get('/on1', (req, res) => {
  serial.write('on1\n');
  res.send('LED 1 on command sent');
});

app.get('/off1', (req, res) => {
  serial.write('off1\n');
  res.send('LED 1 off command sent');
});

app.get('/on2', (req, res) => {
  serial.write('on2\n');
  res.send('LED 2 on command sent');
});

app.get('/off2', (req, res) => {
  serial.write('off2\n');
  res.send('LED 2 off command sent');
});

const server = app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});

wss = new WebSocketServer({ server });

wss.on('connection', ws => {

    //連結時執行此 console 提示
    console.log('瀏覽器連線');

    //當 WebSocket 的連線關閉時執行
    ws.on('close', () => {
        console.log('瀏覽器離線')
    })
});