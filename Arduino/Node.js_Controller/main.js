import { SerialPort } from 'serialport'

console.log(await SerialPort.list());

const serialport = new SerialPort({ path: '/dev/cu.usbmodem1301', baudRate: 9600 });

let ledState = false;
const blink = () => {
    if (ledState) {
        serialport.write('1');
    } else {
        serialport.write('0');
    }
    ledState = !ledState;
}

setInterval(() => {
    blink();
}, 1000);