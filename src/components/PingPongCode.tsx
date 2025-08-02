import React from 'react';

const PingPongCode: React.FC = () => {
  const code = `#include <Servo.h>  

Servo myServo;      
int initialAngle = 0;  
int targetAngle = 45;  
int currentAngle = 0;  

void setup() {
  myServo.attach(9);  
  myServo.write(initialAngle);  
  delay(1000);  //change this to adjust timing of balls getting launched
}

void loop() {
  
  myServo.write(targetAngle);
  delay(1000);  

  
  myServo.write(initialAngle);
  delay(1000);  
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
        
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Robot Ping Pong Opponent - Arduino Code</h1>
        
        <div className="bg-gray-100 p-6 rounded-lg">
          <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap">{code}</pre>
        </div>
      </div>
    </div>
  );
};

export default PingPongCode; 