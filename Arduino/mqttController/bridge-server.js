import mqtt from 'mqtt';
import { SerialPort, ReadlineParser } from 'serialport';

console.log(await SerialPort.list());

const mqttServer = 'mqtt://mqtt-dashboard.com';
const subscribeTopic = ''; // 訂閱主題
const port = '/dev/tty.usbmodem1301';

const serial = new SerialPort({ path: port, baudRate: 9600 });
const mqttClient = mqtt.connect(mqttServer);

const receiveParser = (message) => {
    // arduinoToMqtt(message);
}

const sentToArduino = (message) => {
    serial.write(`${message}\n`);
}

const mqttToArduino = (message) => {
    console.log({mqttToArduino: message});
    sentToArduino(message);
}

const arduinoToMqtt = (message) => {
    console.log({arduinoToMqtt: message});
    mqttClient.publish(subscribeTopic, message);
}

mqttClient.on('connect', () => {
    mqttClient.subscribe(subscribeTopic, () => {
        console.log(`主題訂閱成功: ${subscribeTopic}`);
    })
});

mqttClient.on('message', (topic, message) => {
    mqttToArduino(message.toString());
});

const parser = new ReadlineParser();
serial.pipe(parser);
parser.on('data', receiveParser);