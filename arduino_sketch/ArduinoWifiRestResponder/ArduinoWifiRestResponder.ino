#include <Wire.h>
// https://github.com/arduino-org/Arduino/tree/master/libraries/ArduinoWiFi
#include <ArduinoWiFi.h>
// http://www.airspayce.com/mikem/arduino/AccelStepper/


void setup() {
  Wifi.begin();
  Wifi.println("Arduino REST Responder Server is up");
}

void loop() {
  while(Wifi.available()) {
    process(Wifi);
  }
  
  delay(50);
}

// Method processing the request
void process(WifiData client) {
  // 1. Parsing the URL
  
  // Don't ask, God only knows ...
  client.readStringUntil('/');
  client.readStringUntil('/');
  client.readStringUntil('/');
  
  // Getting the element
  String element = client.readStringUntil('/');
  // Defining the element ID
  String elementNum = client.readStringUntil('/');
  // Defining the action
  String action = client.readStringUntil('/');
  // Defining the value
  String value = client.readStringUntil('/');

  // 2. Processing Reload
  if (element == "reload") {
    //
  }

  // 3. Processing results for LED
  if (element == "led") {
    if (action == "switch") {
      if (value == "ON") {
        //
      } else {
        //
      }
    }
  }

  // 4. Processing results for LED
  if (element == "stepper") {
    if (action == "speed") {
    
    }

    if (action == "acc") {
    
    }
  }
  
  // Sending a response to the server to end the communication
  String res = "Sucess => " + element + " # " + elementNum + " # " + action + " # " + value;
  respond(client, res);
}

// Method delaing with the response
void respond(WifiData client, String res) {
  client.println("HTTP/1.1 200 OK");
  client.println("Content-Type: text/html");
  client.println("Access-Control-Allow-Origin: *");
  client.println();
  client.println("<html>");
  client.println("<head></head>");
  client.println("<body>");
             
  client.println("Communication completed:");
  client.println(res);
  
  client.println("</body>");
  client.println("</html>");
  client.print(DELIMITER); // very important to end the communication !!! 
}

