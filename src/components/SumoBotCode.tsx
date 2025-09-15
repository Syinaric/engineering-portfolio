import React from 'react';

const SumoBotCode: React.FC = () => {
  console.log('SumoBotCode component rendered'); // Debug log
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => {
            window.location.hash = '';
            window.location.reload();
          }}
          className="mb-8 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
        >
          ← Return to Portfolio
        </button>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Sumo Bot - ESP32 Motor Control Code</h1>
        
        <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono whitespace-pre-wrap">
{`#include <WiFi.h>
#include <WebServer.h>

// === WiFi credentials ===
const char* ssid = "ESP32-Motors";
const char* password = "12345678";

// === Motor driver pins ===
int motor1Pin1 = 27;
int motor1Pin2 = 26;
int motor2Pin1 = 25;
int motor2Pin2 = 33;

// Web server on port 80
WebServer server(80);

// === Motor control functions ===
void stopMotors() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, LOW);
  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, LOW);
}

void forward() {
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  digitalWrite(motor2Pin1, HIGH);
  digitalWrite(motor2Pin2, LOW);
}

void backward() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, HIGH);
}

void left() {
  digitalWrite(motor1Pin1, LOW);
  digitalWrite(motor1Pin2, HIGH);
  digitalWrite(motor2Pin1, HIGH);
  digitalWrite(motor2Pin2, LOW);
}

void right() {
  digitalWrite(motor1Pin1, HIGH);
  digitalWrite(motor1Pin2, LOW);
  digitalWrite(motor2Pin1, LOW);
  digitalWrite(motor2Pin2, HIGH);
}

// === HTML control page ===
String htmlPage() {
  return R"rawliteral(
    <!DOCTYPE html>
    <html>
    <head>
      <title>ESP32 Motor Control</title>
      <style>
        button {
          width: 100px; height: 50px; font-size: 18px; margin: 10px;
        }
      </style>
    </head>
    <body>
      <h2>ESP32 Motor Controller</h2>
      <div>
        <button onclick="fetch('/forward')">Forward</button><br>
        <button onclick="fetch('/left')">Left</button>
        <button onclick="fetch('/stop')">Stop</button>
        <button onclick="fetch('/right')">Right</button><br>
        <button onclick="fetch('/backward')">Backward</button>
      </div>
    </body>
    </html>
  )rawliteral";
}

void setup() {
  Serial.begin(115200);

  // Motor pins
  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor1Pin2, OUTPUT);
  pinMode(motor2Pin1, OUTPUT);
  pinMode(motor2Pin2, OUTPUT);

  stopMotors();

  // Start WiFi AP
  WiFi.softAP(ssid, password);
  Serial.println("WiFi started");
  Serial.println(WiFi.softAPIP());

  // Routes
  server.on("/", []() {
    server.send(200, "text/html", htmlPage());
  });

  server.on("/forward", []() { forward(); server.send(200, "text/plain", "Forward"); });
  server.on("/backward", []() { backward(); server.send(200, "text/plain", "Backward"); });
  server.on("/left", []() { left(); server.send(200, "text/plain", "Left"); });
  server.on("/right", []() { right(); server.send(200, "text/plain", "Right"); });
  server.on("/stop", []() { stopMotors(); server.send(200, "text/plain", "Stop"); });

  server.begin();
}

void loop() {
  server.handleClient();
}`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SumoBotCode;
