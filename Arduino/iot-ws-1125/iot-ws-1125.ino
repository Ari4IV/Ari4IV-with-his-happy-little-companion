// 定義LED和按鈕的腳位
const int led1Pin = 12;    // LED1連接到數位腳位12
const int led2Pin = 13;    // LED2連接到數位腳位13
const int button1Pin = 2;  // 按鈕1連接到數位腳位2
const int button2Pin = 3;  // 按鈕2連接到數位腳位3

String inputString = "";         // 用於保存來自串列通訊的數據
bool stringComplete = false;     // 標記串列數據是否接收完整
unsigned long led1StartTime = 0; // 記錄LED1點亮的開始時間
unsigned long led2StartTime = 0; // 記錄LED2點亮的開始時間
bool isLed1On = false;           // 標記LED1的狀態
bool isLed2On = false;           // 標記LED2的狀態

void setup() {
  pinMode(led1Pin, OUTPUT);
  pinMode(led2Pin, OUTPUT);
  pinMode(button1Pin, INPUT);
  pinMode(button2Pin, INPUT);
  Serial.begin(9600);
  inputString.reserve(200);
}

void loop() {
  unsigned long currentTime = millis();

  // 檢查按鈕狀態
  checkButtonState(currentTime);

  // 處理串列通訊
  if (stringComplete) {
    handleSerialInput(currentTime);
    inputString = "";
    stringComplete = false;
  }

  // 關閉LED
  turnOffLed(currentTime);
}

void checkButtonState(unsigned long currentTime) {
  if (digitalRead(button1Pin) == HIGH) {
    digitalWrite(led1Pin, HIGH);
    led1StartTime = currentTime;
    isLed1On = true;
  }
  if (digitalRead(button2Pin) == HIGH) {
    digitalWrite(led2Pin, HIGH);
    led2StartTime = currentTime;
    isLed2On = true;
  }
}

void handleSerialInput(unsigned long currentTime) {
  Serial.println("Echo: " + inputString);
  if (inputString == "on1\n") {
    digitalWrite(led1Pin, HIGH);
    led1StartTime = currentTime;
    isLed1On = true;
  } else if (inputString == "off1\n") {
    digitalWrite(led1Pin, LOW);
    isLed1On = false;
  } else if (inputString == "on2\n") {
    digitalWrite(led2Pin, HIGH);
    led2StartTime = currentTime;
    isLed2On = true;
  } else if (inputString == "off2\n") {
    digitalWrite(led2Pin, LOW);
    isLed2On = false;
  }
}

void turnOffLed(unsigned long currentTime) {
  if (isLed1On && currentTime - led1StartTime >= 10000) {
    digitalWrite(led1Pin, LOW);
    isLed1On = false;
  }
  if (isLed2On && currentTime - led2StartTime >= 10000) {
    digitalWrite(led2Pin, LOW);
    isLed2On = false;
  }
}

void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read();
    inputString += inChar;
    if (inChar == '\n') {
      stringComplete = true;
    }
  }
}
