import mqtt from 'mqtt';
import { SerialPort, ReadlineParser } from 'serialport';

console.log(await SerialPort.list());

const mqttServer = 'mqtt://mqtt-dashboard.com';
const subscribeTopic = ''; // 訂閱主題
const port = '/dev/tty.usbmodem1301';

const serial = new SerialPort({ path: port, baudRate: 9600 });
const mqttClient = mqtt.connect(mqttServer);

const ARDUINO_PREFIX = "FromArduino:";  // 來自 Arduino 的訊息前綴

const receiveParser = (message) => {
    arduinoToMqtt(message);
}

const sentToArduino = (message) => {
    serial.write(`${message}\n`);
}

const mqttToArduino = (message) => {
    // 只有當訊息不是來自 Arduino 時才發送
    if (!message.startsWith(ARDUINO_PREFIX)) {
        console.log({mqttToArduino: message});
        sentToArduino(message);
    }
}

const arduinoToMqtt = (message) => {
    // 只處理有效的訊息
    if (messageIsValid(message)) {
        console.log({arduinoToMqtt: message});
        // 添加前綴到訊息
        const messageWithPrefix = ARDUINO_PREFIX + message;
        mqttClient.publish(subscribeTopic, messageWithPrefix);
    }
}

function messageIsValid(message) {
    // 實現一個檢查訊息是否有效的邏輯
    return message && !message.startsWith('\r') && !message.startsWith('Echo:');
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