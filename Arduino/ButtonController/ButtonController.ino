const int buttonPin = 2;  // the number of the pushbutton pin
const int ledPin = 13;    // the number of the LED pin

int buttonState = 0;          // current state of the button
int lastButtonState = LOW;    // previous state of the button
bool ledState = LOW;          // state of the LED

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  buttonState = digitalRead(buttonPin);

  // check for button state change
  if (buttonState != lastButtonState) {
    if (buttonState == HIGH) {
      // invert the ledState
      ledState = !ledState;
      // update the LED with the new ledState
      digitalWrite(ledPin, ledState);
    }
    // save the current button state for the next loop
    lastButtonState = buttonState;
  }
  // small delay to debounce the button
  delay(50);
}
