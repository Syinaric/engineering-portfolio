import React from 'react';

const SumoBotCode: React.FC = () => {
  const code = `#include <WiFi.h>
#include <WebServer.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Motor pins
const int LEFT_MOTOR_PIN1 = 2;
const int LEFT_MOTOR_PIN2 = 4;
const int RIGHT_MOTOR_PIN1 = 5;
const int RIGHT_MOTOR_PIN2 = 18;
const int LEFT_MOTOR_PWM = 16;
const int RIGHT_MOTOR_PWM = 17;

// Motor speed (0-255)
int motorSpeed = 200;

// Web server on port 80
WebServer server(80);

void setup() {
  Serial.begin(115200);
  
  // Configure motor pins
  pinMode(LEFT_MOTOR_PIN1, OUTPUT);
  pinMode(LEFT_MOTOR_PIN2, OUTPUT);
  pinMode(RIGHT_MOTOR_PIN1, OUTPUT);
  pinMode(RIGHT_MOTOR_PIN2, OUTPUT);
  pinMode(LEFT_MOTOR_PWM, OUTPUT);
  pinMode(RIGHT_MOTOR_PWM, OUTPUT);
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  
  // Setup web server routes
  server.on("/", handleRoot);
  server.on("/control", handleControl);
  server.on("/status", handleStatus);
  
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  server.handleClient();
}

// Handle root path
void handleRoot() {
  String html = "<!DOCTYPE html><html><head>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
  html += "<title>Sumo Bot Control</title>";
  html += "<style>body{font-family:Arial;text-align:center;background:#1a1a1a;color:#fff;}";
  html += ".container{margin:50px auto;max-width:400px;}";
  html += "button{width:100px;height:100px;margin:10px;font-size:24px;border:none;border-radius:10px;cursor:pointer;}";
  html += ".forward{background:#4CAF50;} .backward{background:#f44336;}";
  html += ".left{background:#2196F3;} .right{background:#FF9800;}";
  html += ".stop{background:#9e9e9e;width:220px;}";
  html += "</style></head><body>";
  html += "<div class='container'>";
  html += "<h1>Sumo Bot Control</h1>";
  html += "<button class='forward' onclick='sendCmd(\"forward\")'>↑</button><br>";
  html += "<button class='left' onclick='sendCmd(\"left\")'>←</button>";
  html += "<button class='stop' onclick='sendCmd(\"stop\")'>STOP</button>";
  html += "<button class='right' onclick='sendCmd(\"right\")'>→</button><br>";
  html += "<button class='backward' onclick='sendCmd(\"backward\")'>↓</button>";
  html += "<script>function sendCmd(cmd){fetch('/control?cmd='+cmd);}</script>";
  html += "</div></body></html>";
  server.send(200, "text/html", html);
}

// Handle control commands
void handleControl() {
  String cmd = server.arg("cmd");
  
  if (cmd == "forward") {
    moveForward();
  } else if (cmd == "backward") {
    moveBackward();
  } else if (cmd == "left") {
    turnLeft();
  } else if (cmd == "right") {
    turnRight();
  } else if (cmd == "stop") {
    stopMotors();
  }
  
  server.send(200, "text/plain", "OK");
}

// Handle status request
void handleStatus() {
  String status = "{\"status\":\"running\",\"ip\":\"" + WiFi.localIP().toString() + "\"}";
  server.send(200, "application/json", status);
}

// Motor control functions
void moveForward() {
  digitalWrite(LEFT_MOTOR_PIN1, HIGH);
  digitalWrite(LEFT_MOTOR_PIN2, LOW);
  digitalWrite(RIGHT_MOTOR_PIN1, HIGH);
  digitalWrite(RIGHT_MOTOR_PIN2, LOW);
  analogWrite(LEFT_MOTOR_PWM, motorSpeed);
  analogWrite(RIGHT_MOTOR_PWM, motorSpeed);
  Serial.println("Moving forward");
}

void moveBackward() {
  digitalWrite(LEFT_MOTOR_PIN1, LOW);
  digitalWrite(LEFT_MOTOR_PIN2, HIGH);
  digitalWrite(RIGHT_MOTOR_PIN1, LOW);
  digitalWrite(RIGHT_MOTOR_PIN2, HIGH);
  analogWrite(LEFT_MOTOR_PWM, motorSpeed);
  analogWrite(RIGHT_MOTOR_PWM, motorSpeed);
  Serial.println("Moving backward");
}

void turnLeft() {
  digitalWrite(LEFT_MOTOR_PIN1, LOW);
  digitalWrite(LEFT_MOTOR_PIN2, HIGH);
  digitalWrite(RIGHT_MOTOR_PIN1, HIGH);
  digitalWrite(RIGHT_MOTOR_PIN2, LOW);
  analogWrite(LEFT_MOTOR_PWM, motorSpeed);
  analogWrite(RIGHT_MOTOR_PWM, motorSpeed);
  Serial.println("Turning left");
}

void turnRight() {
  digitalWrite(LEFT_MOTOR_PIN1, HIGH);
  digitalWrite(LEFT_MOTOR_PIN2, LOW);
  digitalWrite(RIGHT_MOTOR_PIN1, LOW);
  digitalWrite(RIGHT_MOTOR_PIN2, HIGH);
  analogWrite(LEFT_MOTOR_PWM, motorSpeed);
  analogWrite(RIGHT_MOTOR_PWM, motorSpeed);
  Serial.println("Turning right");
}

void stopMotors() {
  digitalWrite(LEFT_MOTOR_PIN1, LOW);
  digitalWrite(LEFT_MOTOR_PIN2, LOW);
  digitalWrite(RIGHT_MOTOR_PIN1, LOW);
  digitalWrite(RIGHT_MOTOR_PIN2, LOW);
  analogWrite(LEFT_MOTOR_PWM, 0);
  analogWrite(RIGHT_MOTOR_PWM, 0);
  Serial.println("Stopped");
}`;

  const handleReturnHome = () => {
    // Clear the hash and go back to the main portfolio
    window.location.hash = '';
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleReturnHome}
          className="mb-8 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Return to Portfolio
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Sumo Bot - ESP32 Code</h1>
        <p className="text-gray-600 mb-4">
          ESP32-based sumo bot with WiFi connectivity for mobile app control
        </p>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap overflow-x-auto">{code}</pre>
        </div>
      </div>
    </div>
  );
};

export default SumoBotCode;




