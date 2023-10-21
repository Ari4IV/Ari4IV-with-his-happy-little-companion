const int buttonPin = 2;
const int ledPin = 13;

int buttonState = 0;
int lastButtonState = LOW;
bool ledState = LOW;
unsigned long ledOnTime = 0;

void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);

  if (buttonState == HIGH && lastButtonState == LOW) {
    ledState = HIGH;
    digitalWrite(ledPin, ledState);
    Serial.println("LED On");
    ledOnTime = millis();
  }

  if (ledState == HIGH) {
    int secondsPassed = (millis() - ledOnTime) / 1000;

    if (secondsPassed < 10) {
      Serial.println(10 - secondsPassed);
      delay(1000);
    } else {
      ledState = LOW;
      digitalWrite(ledPin, ledState);
      Serial.println("LED Off");
    }
  }

  if (Serial.available()) {
    char c = Serial.read();

    if (c == '1') {
      ledState = HIGH;
      digitalWrite(ledPin, ledState);
      Serial.println("LED On");
      ledOnTime = millis();
    } else if (c == '0') {
      ledState = LOW;
      digitalWrite(ledPin, ledState);
      Serial.println("LED Off");
    }
  }

  lastButtonState = buttonState;
}
