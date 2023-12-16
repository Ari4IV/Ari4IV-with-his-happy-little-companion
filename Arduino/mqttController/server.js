import Express from 'express';
import mqtt from 'mqtt';
import { WebSocketServer } from "ws";

const mqttServer = 'mqtt://mqtt-dashboard.com';
const subscribeTopic = ''; // 訂閱主題
const client = mqtt.connect(mqttServer);
let wss;

const sendToBrowser = msg => {
    wss.clients.forEach(client => {
        client.send(msg);
    });
}

const mqttToBrowser = (message) => {
    console.log({mqttToBrowser: message});
    sendToBrowser(message);
}

const browserToMqtt = (message) => {
    console.log({browserToMqtt: message});
    client.publish(subscribeTopic, message);
}

client.on('connect', () => {
    client.subscribe(subscribeTopic, () => {
        console.log(`主題訂閱成功: ${subscribeTopic}`);
    })
});

client.on('message', (topic, message) => {
    mqttToBrowser(message.toString());
});

const app = Express();

app.get('/', function (req, res) {
    return res.sendFile('/index.html', { root: '.' });
});

app.get('/on1', (req, res) => {
    browserToMqtt('on1');

    return res.end()
});

app.get('/off1', (req, res) => {
    browserToMqtt('off1');

    return res.end()
});

app.get('/on2', (req, res) => {
    browserToMqtt('on2');

    return res.end()
});

app.get('/off2', (req, res) => {
    browserToMqtt('off2');

    return res.end()
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