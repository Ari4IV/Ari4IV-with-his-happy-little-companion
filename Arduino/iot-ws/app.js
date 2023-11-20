import Express from 'express';
import { SerialPort,ReadlineParser } from 'serialport';
import {WebSocketServer} from "ws";

let wss;

console.log(await SerialPort.list());
const port = '/dev/tty.usbmodem1401';

const serial = new SerialPort({ path: port, baudRate: 9600 });

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

app.get('/on', function (req, res) {
    sentToArduino('on');
    
    return res.end();
});

app.get('/off', function (req, res) {
    sentToArduino('off');
    
    return res.end();
});


const server = app.listen(8080, () => {
    console.log("Started.");
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