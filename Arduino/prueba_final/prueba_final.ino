#include <OneWire.h>
#include <DallasTemperature.h>
#include <ESP32Time.h>
#include <LiquidCrystal.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>

//********************* Configuración de pines *********************//
#define PIN_TEMPERATURA 32
int PIN_TURBIDEZ = 34;
#define PIN_SERVO 15

//********************* Temperatura *********************//
OneWire ourWire(PIN_TEMPERATURA);
DallasTemperature sensors(&ourWire);

//*********************** Tiempo ***************************//
LiquidCrystal lcd(22, 23, 5, 18, 19, 21);
ESP32Time tM;

//************* Motor *************//
Servo servoMotor;

//********************* Variables globales *********************//
float temperatura;
float turbidez;
int angle;
int pwmSignal = 1500;

bool moviendoPositivo = true;
int n = 0;

//************* Subir Datos *************//
// Replace with your netwocrk credentials
const char* ssid = "manuRed";
const char* password = "123456789";

// Your API endpoint
const char* serverNameTemp = "https://pescera.onrender.com/temperature";
const char* serverNameTurb = "https://pescera.onrender.com/turbidity";
const char* serverNameFood = "https://pescera.onrender.com/food";

  //************* Funciones *************//
  // para subir los datos
  void enviarDatosAlServidor() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado, intentando reconectar...");
    WiFi.begin(ssid, password);
    delay(5000); // Esperar para reconexión
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("No se pudo reconectar al WiFi");
      return; // Salir de la función si no se conecta
    }
  }

  HTTPClient http;

  // Función modular para enviar datos
  auto enviarHTTP = [&](const char* serverName, const String& payload) {
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    int httpResponseCode = http.POST(payload);

    if (httpResponseCode > 0) {
      Serial.printf("Código de respuesta: %d\n", httpResponseCode);
      String response = http.getString();
      Serial.println("Respuesta del servidor: " + response);
    } else {
      Serial.printf("Error al enviar la solicitud: %s\n", http.errorToString(httpResponseCode).c_str());
    }

    http.end();
  };

  // Datos de temperatura
  String temperatureData = "{\"temperatura\": " + String(temperatura) + "}";
  enviarHTTP(serverNameTemp, temperatureData);

  // Datos de turbidez
  String turbidityData = "{\"turbidez\": " + String(turbidez) + "}";
  enviarHTTP(serverNameTurb, turbidityData);

  // Datos del motor
    String motorData = "{\"motor\": " + String(angle) + "}";
    Serial.print("Angulo: ");
    Serial.println(angle);
    enviarHTTP(serverNameFood, motorData);
}

//********************* Setup *********************//
void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  
  // Connect to Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi");

  // Inicializar sensores
  sensors.begin();
  lcd.begin(16, 2);

  // Inicializar servo
  servoMotor.attach(PIN_SERVO);
  servoMotor.write(0);
}

//********************* Loop *********************//
void loop() {
  lcd.clear();

  //******************** temperatura ***********************//
  sensors.requestTemperatures();   //Se envía el comando para leer la temperatura
  temperatura = sensors.getTempCByIndex(0); //Se obtiene la temperatura en ºC
  Serial.print("TEMPERATURA");
  Serial.println(temperatura);

  lcd.setCursor(0, 0); lcd.print("Temperatura:");
  lcd.setCursor(0, 2); lcd.print(temperatura);
  delay(5000);
  lcd.clear();
  ////////////////////////////////////////////////////////////

  //******************** Turbidez ***********************//
  int sensorValue = analogRead(PIN_TURBIDEZ);
  Serial.println("Turbidez");
  Serial.println(sensorValue);
  turbidez = sensorValue * (5.0 / 1024.0); 
  Serial.println("Turbidez converted");
  Serial.println(turbidez);

  lcd.setCursor(0, 0); lcd.print("Turbidity:");
  lcd.setCursor(0, 2); lcd.print(turbidez);
  delay(5000);
  lcd.clear();
  ////////////////////////////////////////////////////////

  //******************** Motor ***********************//

  for (int i = 0; i <= 360; i++) {
    servoMotor.write(i);
    n = i;
  }
  
  angle = n;
  delay(10000);

  ////////////////////////////////////////////////////////

  enviarDatosAlServidor();
  delay(6000); // Send data every 6 seconds
}