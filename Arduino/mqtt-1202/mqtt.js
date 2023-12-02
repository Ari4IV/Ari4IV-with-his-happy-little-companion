const mqtt = require("mqtt");

const client = mqtt.connect("mqtt://mqtt-dashboard.com");
const mqtt_topic = "";

client.on("connect", () => {
  client.subscribe(mqtt_topic, (err) => {
    if (!err) {
      // 定時每10秒發送當前時間
      setInterval(() => {
        const now = new Date().toLocaleString(); // 取得當前時間並轉換為易讀格式
        client.publish(mqtt_topic, "現在時間: " + now);
      }, 10000); // 10000毫秒（即10秒）
    }
  });
});

client.on("message", (mqtt_topic, message) => {
  // message is Buffer
  console.log(message.toString());
  // client.end();
});
