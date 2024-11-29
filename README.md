# **SmartSnack - Dispensador Inteligente de Comida para Peces** 🐠

**SmartSnack** es un sistema IoT diseñado para automatizar el cuidado de peces en entornos domesticos. Este dispositivo combina la dispensación precisa de alimento, la medición de temperatura y el monitoreo de la turbidez del agua para asegurar un entorno óptimo para tus peces. Los datos recolectados son almacenados en una base de datos y posteriormente se pueden visualizar en una página web.

---

## **Características Principales** 🌟
- **Dispensador automático de comida:** Utiliza un servomotor para controlar la cantidad de alimento dispensado.
- **Sensor de temperatura:** Monitorea la temperatura del agua en tiempo real para mantener condiciones adecuadas.
- **Sensor de turbidez:** Mide la calidad del agua para detectar si necesita limpieza.
- **Conectividad IoT:** Los datos se envían automáticamente a una base de datos en la nube.
- **Interfaz web:** Visualización de datos en tiempo real desde cualquier dispositivo con conexión a internet.

---

## **Componentes del Sistema** 🔧

### **Hardware**
- **Microcontrolador**: ESP32
- **Servomotor**: Para el mecanismo del dispensador de comida.
- **Sensor de temperatura**: DS18B20
- **Sensor de turbidez**: SEN0189

### **Software**
- **Lenguaje de programación**: C++ utilizado en el IDE de Arduino.
- **Base de datos**: desarrollada usando MySQL y desplegada en railway.
- **Interfaz web**: Desarrollada en HTML/CSS/JavaScript.

---

## **Instalación y Configuración** 🚀

### **Requisitos Previos**
1. Tener instalado el entorno de desarrollo Arduino IDE.
2. Configurar una base de datos en la nube (MySQL, Firebase, etc.).
3. Conexión a una red Wi-Fi.

### **Pasos de Instalación**
1. Clona este repositorio:
   ```bash
   git clone https://github.com/YaelChar417/front-back-_end_iot_2024.git
